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

KEY=$(cat .env-key)

# Decrypt .env.enc to .env.local
openssl enc -aes-256-cbc -d -in .env.enc -out .env.local -pass pass:"$KEY" -pbkdf2

if [ $? -eq 0 ]; then
    echo "✅ .env.enc decrypted successfully to .env.local"
else
    echo "❌ Decryption failed. Is your .env-key correct?"
    exit 1
fi
