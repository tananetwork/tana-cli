#!/bin/bash
set -e

# Tana CLI Installer
# Usage: curl -fsSL https://raw.githubusercontent.com/tananetwork/tana/main/install.sh | bash

REPO="tananetwork/tana"
INSTALL_DIR="/usr/local/bin"

echo ""
echo "🌐 Installing Tana CLI..."
echo ""

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
    echo "❌ Unsupported architecture: $ARCH"
    echo "   Supported: x86_64, aarch64, arm64"
    exit 1
    ;;
esac

case "$OS" in
  darwin)
    OS="macos"
    ;;
  linux)
    OS="linux"
    ;;
  *)
    echo "❌ Unsupported operating system: $OS"
    echo "   Supported: macOS, Linux"
    exit 1
    ;;
esac

BINARY="tana-${OS}-${ARCH}"
echo "📦 Detected platform: ${OS}-${ARCH}"
echo ""

# Download latest release
URL="https://github.com/${REPO}/releases/latest/download/${BINARY}"
echo "⬇️  Downloading from: ${URL}"

if ! curl -fsSL "$URL" -o /tmp/tana; then
  echo ""
  echo "❌ Download failed!"
  echo "   URL: ${URL}"
  echo ""
  echo "   Possible causes:"
  echo "   - No release exists for ${BINARY}"
  echo "   - Network connection issue"
  echo "   - GitHub is down"
  exit 1
fi

echo "✅ Download complete"
echo ""

# Install
echo "📥 Installing to ${INSTALL_DIR}/tana..."

if [ -w "$INSTALL_DIR" ]; then
  # User has write permission
  mv /tmp/tana "$INSTALL_DIR/tana"
  chmod +x "$INSTALL_DIR/tana"
else
  # Need sudo
  echo "   (This may require sudo password)"
  sudo mv /tmp/tana "$INSTALL_DIR/tana"
  sudo chmod +x "$INSTALL_DIR/tana"
fi

echo "✅ Installed successfully"
echo ""

# Verify
if command -v tana &> /dev/null; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ Tana CLI is ready!"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  tana --version
  echo ""
  echo "Get started:"
  echo "  tana --help"
  echo "  tana mesh register"
  echo ""
else
  echo "⚠️  Installation complete, but 'tana' not found in PATH"
  echo ""
  echo "   Add ${INSTALL_DIR} to your PATH:"
  echo "   export PATH=\"${INSTALL_DIR}:\$PATH\""
  echo ""
  echo "   Or install to a directory in your PATH:"
  echo "   mkdir -p ~/.local/bin"
  echo "   mv ${INSTALL_DIR}/tana ~/.local/bin/"
  echo ""
fi
