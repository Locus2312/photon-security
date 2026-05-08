#!/bin/bash

# Ensure we are in the root directory
cd "$(dirname "$0")/.."

if [ ! -f .env-key ]; then
    echo "❌ Error: .env-key not found."
    echo "You need the .env-key file to decrypt the environment variables."
    exit 1
fi

if [ ! -f .env.enc ]; then
    echo "⚠️  Warning: .env.enc not found. Nothing to decrypt."
    exit 0
fi

# Prevent accidental overwrite
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists. Refusing to overwrite."
    exit 0
fi

KEY=$(cat .env-key)

TMP_FILE=$(mktemp)

if openssl enc -aes-256-cbc -d \
    -in .env.enc \
    -out "$TMP_FILE" \
    -pass pass:"$KEY" \
    -pbkdf2; then

    mv "$TMP_FILE" .env.local
    echo "✅ .env.enc decrypted successfully to .env.local"

else
    rm -f "$TMP_FILE"
    echo "❌ Decryption failed. Is your .env-key correct?"
    exit 1
fi
