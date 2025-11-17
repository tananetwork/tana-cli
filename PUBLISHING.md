# Publishing Guide

Guide for publishing Tana CLI and packages to npm, GitHub Packages, and creating releases for VM testing.

## Overview

Tana consists of multiple publishable components:

1. **`tana-cli`** - Main CLI binary (compiled with Bun)
2. **`@tana/crypto`** - Shared cryptography utilities
3. **Service packages** - mesh, ledger, t4, identity, etc.

## Quick Start

```bash
# 1. Publish crypto package (required by CLI)
cd crypto
npm version patch
npm publish --access public

# 2. Publish CLI
cd cli
npm version patch
npm publish --access public

# 3. Create GitHub release with binaries
# (see "GitHub Releases" section)
```

---

## 1. Publishing to npm

### Prerequisites

```bash
# Login to npm
npm login

# Verify login
npm whoami

# Set registry (if needed)
npm config set registry https://registry.npmjs.org/
```

### Publishing @tana/crypto

```bash
cd crypto

# Update version
npm version patch   # 0.1.0 → 0.1.1
npm version minor   # 0.1.0 → 0.2.0
npm version major   # 0.1.0 → 1.0.0

# Publish (scoped packages need --access public)
npm publish --access public

# Verify
npm info @tana/crypto
```

### Publishing tana-cli

**Important:** The CLI needs to be published as a package, but users will primarily install pre-compiled binaries from GitHub releases.

```bash
cd cli

# Update version
npm version patch

# Build binary
bun run make

# Publish package (for dependencies)
npm publish --access public
```

**CLI Installation Methods:**

```bash
# Method 1: Direct binary download (recommended for users)
curl -fsSL https://github.com/tananetwork/tana/releases/latest/download/tana-macos-arm64 -o /usr/local/bin/tana
chmod +x /usr/local/bin/tana

# Method 2: Via npm (for development)
npm install -g tana-cli
```

---

## 2. GitHub Packages (Alternative Registry)

GitHub Packages can serve as a backup registry or for private testing.

### Setup

```bash
# Create .npmrc in project root
echo "@tananetwork:registry=https://npm.pkg.github.com" >> .npmrc

# Login with GitHub token
npm login --scope=@tananetwork --registry=https://npm.pkg.github.com

# Username: your-github-username
# Password: your-github-PAT (Personal Access Token)
# Email: your-email
```

### Publish to GitHub Packages

```bash
# Update package.json
{
  "name": "@tananetwork/tana-cli",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}

# Publish
npm publish
```

---

## 3. GitHub Releases (Binaries for VMs)

This is the **recommended distribution method** for end users and VM testing.

### Manual Release Process

```bash
# 1. Build binaries for all platforms
cd cli

# macOS ARM64
bun build ./main.ts --compile --target=bun-darwin-arm64 --outfile dist/tana-macos-arm64

# macOS x64
bun build ./main.ts --compile --target=bun-darwin-x64 --outfile dist/tana-macos-x64

# Linux x64 (for VMs)
bun build ./main.ts --compile --target=bun-linux-x64 --outfile dist/tana-linux-x64

# Linux ARM64 (Raspberry Pi, ARM servers)
bun build ./main.ts --compile --target=bun-linux-arm64 --outfile dist/tana-linux-arm64

# 2. Create git tag
git tag v0.1.0
git push origin v0.1.0

# 3. Create GitHub release manually
# Go to: https://github.com/tananetwork/tana/releases/new
# - Tag: v0.1.0
# - Title: "Tana CLI v0.1.0"
# - Upload binaries from dist/
# - Add release notes
```

### Automated Releases with GitHub Actions

Create `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    name: Build ${{ matrix.platform }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        include:
          - os: macos-latest
            platform: macos-arm64
            target: bun-darwin-arm64
          - os: macos-latest
            platform: macos-x64
            target: bun-darwin-x64
          - os: ubuntu-latest
            platform: linux-x64
            target: bun-linux-x64
          - os: ubuntu-latest
            platform: linux-arm64
            target: bun-linux-arm64
    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: cd cli && bun install

      - name: Build binary
        run: |
          cd cli
          bun build ./main.ts --compile --target=${{ matrix.target }} --outfile dist/tana-${{ matrix.platform }}

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: tana-${{ matrix.platform }}
          path: cli/dist/tana-${{ matrix.platform }}

  release:
    name: Create Release
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Download artifacts
        uses: actions/download-artifact@v4
        with:
          path: binaries

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: binaries/*/tana-*
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Creating a Release

```bash
# 1. Update version in package.json
cd cli
npm version 0.2.0

# 2. Commit and tag
git add .
git commit -m "chore: bump version to 0.2.0"
git tag v0.2.0
git push origin main --tags

# 3. GitHub Actions will automatically:
#    - Build binaries for all platforms
#    - Create GitHub release
#    - Upload binaries as release assets
```

---

## 4. Testing on VMs

### Install on Ubuntu/Debian VM

```bash
# Download latest release
curl -fsSL https://github.com/tananetwork/tana/releases/latest/download/tana-linux-x64 -o /usr/local/bin/tana

# Make executable
chmod +x /usr/local/bin/tana

# Verify
tana --version

# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up --hostname=validator-vm-1

# Register with mesh
tana mesh register
```

### Install on macOS VM (Virtualization.framework)

```bash
# Download macOS ARM64 binary
curl -fsSL https://github.com/tananetwork/tana/releases/latest/download/tana-macos-arm64 -o /usr/local/bin/tana
chmod +x /usr/local/bin/tana

# Install Tailscale
brew install tailscale
sudo tailscale up --hostname=validator-mac-1

# Register
tana mesh register
```

### Multi-VM Test Setup

Create VMs on different cloud providers to test real networking:

```bash
# VM 1: DigitalOcean Ubuntu (validator-do-1)
# VM 2: AWS EC2 Ubuntu (validator-aws-1)
# VM 3: Hetzner Ubuntu (validator-hetzner-1)

# On each VM:
1. Install tana binary
2. Install Tailscale
3. Join Tailscale network
4. Register with mesh coordinator
5. Sovereign approves all nodes
6. Verify mesh list shows all validators
```

---

## 5. Version Management Strategy

### Semantic Versioning

- **Patch (0.1.x):** Bug fixes, small improvements
- **Minor (0.x.0):** New features, backward compatible
- **Major (x.0.0):** Breaking changes

### Pre-release Versions

```bash
# Alpha releases
npm version prerelease --preid=alpha
# 0.1.0 → 0.1.1-alpha.0

# Beta releases
npm version prerelease --preid=beta
# 0.1.0 → 0.1.1-beta.0

# Release candidates
npm version prerelease --preid=rc
# 0.1.0 → 0.1.1-rc.0
```

### Publishing Pre-releases

```bash
# Publish with 'next' tag instead of 'latest'
npm publish --tag next

# Users can install with:
npm install tana-cli@next
```

---

## 6. Package Configuration

### crypto/package.json

```json
{
  "name": "@tana/crypto",
  "version": "0.1.0",
  "type": "module",
  "main": "src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "files": [
    "src/**/*",
    "README.md"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

### cli/package.json

```json
{
  "name": "tana-cli",
  "version": "0.1.0",
  "type": "module",
  "bin": {
    "tana": "./dist/tana"
  },
  "files": [
    "dist/tana",
    "README.md"
  ],
  "scripts": {
    "prepublishOnly": "bun run make"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

---

## 7. Distribution Checklist

Before publishing:

- [ ] Update CHANGELOG.md with release notes
- [ ] Run all tests: `bun test`
- [ ] Build binaries: `bun run make`
- [ ] Test binary locally: `./dist/tana --version`
- [ ] Update version: `npm version [patch|minor|major]`
- [ ] Commit changes: `git commit -am "chore: release vX.Y.Z"`
- [ ] Create tag: `git tag vX.Y.Z`
- [ ] Push with tags: `git push origin main --tags`
- [ ] Verify GitHub Actions build passes
- [ ] Download and test release binary
- [ ] Announce release (Discord, Twitter, etc.)

---

## 8. Installation Scripts

### One-liner Install (for users)

Create `install.sh`:

```bash
#!/bin/bash
set -e

# Detect OS and architecture
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

case "$ARCH" in
  x86_64)
    ARCH="x64"
    ;;
  aarch64|arm64)
    ARCH="arm64"
    ;;
  *)
    echo "Unsupported architecture: $ARCH"
    exit 1
    ;;
esac

BINARY="tana-${OS}-${ARCH}"
URL="https://github.com/tananetwork/tana/releases/latest/download/${BINARY}"

echo "Downloading Tana CLI..."
curl -fsSL "$URL" -o /tmp/tana

echo "Installing to /usr/local/bin/tana..."
sudo mv /tmp/tana /usr/local/bin/tana
sudo chmod +x /usr/local/bin/tana

echo "✅ Tana CLI installed successfully!"
tana --version
```

**Usage:**

```bash
curl -fsSL https://raw.githubusercontent.com/tananetwork/tana/main/install.sh | bash
```

---

## 9. Troubleshooting

### Binary Not Found After Install

```bash
# Check if /usr/local/bin is in PATH
echo $PATH

# Add to PATH if missing (add to ~/.bashrc or ~/.zshrc)
export PATH="/usr/local/bin:$PATH"
```

### Permission Denied

```bash
# Make binary executable
chmod +x /usr/local/bin/tana

# Or install to user directory
curl -fsSL <url> -o ~/.local/bin/tana
chmod +x ~/.local/bin/tana
```

### Wrong Architecture

```bash
# Check your architecture
uname -m

# Download correct binary:
# x86_64 → linux-x64
# aarch64/arm64 → linux-arm64
```

---

## Resources

- npm Documentation: https://docs.npmjs.com/
- GitHub Packages: https://docs.github.com/en/packages
- GitHub Releases: https://docs.github.com/en/repositories/releasing-projects-on-github
- Bun Build: https://bun.sh/docs/bundler/executables
- Semantic Versioning: https://semver.org/
