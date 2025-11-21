#!/bin/bash

# Test script for standalone consensus service
# Starts 3 validators and tests peer connection

set -e

echo "Starting 3-validator testnet..."

# Kill any existing processes
pkill -f "bun.*consensus" || true
sleep 2

BASE_DIR="/Users/samifouad/Projects/tana/cli/services/consensus"

# Validator 1
echo "Starting Validator 1 (WS: 9000, HTTP: 9001)..."
cd "$BASE_DIR"
VALIDATOR_ID=val_1 \
CONSENSUS_PORT=9000 \
HTTP_PORT=9001 \
PEERS='[]' \
DATABASE_URL='postgres://tana:tana_dev_password@localhost:5432/tana' \
bun run dev > /tmp/val1-consensus.log 2>&1 &

sleep 2

# Validator 2
echo "Starting Validator 2 (WS: 9010, HTTP: 9011)..."
cd "$BASE_DIR"
VALIDATOR_ID=val_2 \
CONSENSUS_PORT=9010 \
HTTP_PORT=9011 \
PEERS='[{"id":"val_1","wsUrl":"ws://localhost:9000"}]' \
DATABASE_URL='postgres://tana:tana_dev_password@localhost:5432/tana' \
bun run dev > /tmp/val2-consensus.log 2>&1 &

sleep 2

# Validator 3
echo "Starting Validator 3 (WS: 9020, HTTP: 9021)..."
cd "$BASE_DIR"
VALIDATOR_ID=val_3 \
CONSENSUS_PORT=9020 \
HTTP_PORT=9021 \
PEERS='[{"id":"val_1","wsUrl":"ws://localhost:9000"},{"id":"val_2","wsUrl":"ws://localhost:9010"}]' \
DATABASE_URL='postgres://tana:tana_dev_password@localhost:5432/tana' \
bun run dev > /tmp/val3-consensus.log 2>&1 &

sleep 3

echo ""
echo "Validators started!"
echo ""

# Check health
echo "Checking health endpoints..."
curl -s http://localhost:9001/health | jq
curl -s http://localhost:9011/health | jq
curl -s http://localhost:9021/health | jq

echo ""
echo "Checking peer connections..."
curl -s http://localhost:9001/peers | jq
curl -s http://localhost:9011/peers | jq
curl -s http://localhost:9021/peers | jq

echo ""
echo "Test block proposal..."
curl -X POST http://localhost:9001/propose \
  -H "Content-Type: application/json" \
  -d '{
    "block": {
      "height": 1,
      "hash": "test_block_hash_123",
      "previousHash": "genesis",
      "timestamp": 1234567890,
      "transactions": [],
      "proposerId": "val_1"
    }
  }' | jq

sleep 2

echo ""
echo "Checking quorum status..."
curl -s http://localhost:9001/quorum/test_block_hash_123 | jq

echo ""
echo "Logs:"
echo "  tail -f /tmp/val1-consensus.log"
echo "  tail -f /tmp/val2-consensus.log"
echo "  tail -f /tmp/val3-consensus.log"
echo ""
echo "Stop with: pkill -f 'bun.*consensus'"
