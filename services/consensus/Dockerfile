# Consensus Service Dockerfile
# Multi-stage build for production-ready consensus service

FROM oven/bun:1.1.38-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile --production

# Copy source code
COPY . .

# Build step (if needed - currently we run TypeScript directly)
# RUN bun run build

FROM oven/bun:1.1.38-alpine AS runtime

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy dependencies and source from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src

# Create non-root user
RUN addgroup -g 1001 -S consensus && \
    adduser -S consensus -u 1001

# Set ownership
RUN chown -R consensus:consensus /app

# Switch to non-root user
USER consensus

# Expose ports
# CONSENSUS_PORT (WebSocket P2P)
EXPOSE 9000
# HTTP_PORT (REST API)
EXPOSE 9001

# Health check
HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 \
  CMD bun -e "const res = await fetch('http://localhost:' + (process.env.HTTP_PORT || '9001') + '/health'); if (!res.ok) process.exit(1)"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Run the service
CMD ["bun", "run", "start"]
