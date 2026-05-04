#!/bin/bash

# Ensure we are in the root directory
cd "$(dirname "$0")/.."

if [ ! -f .env-key ]; then
    echo "❌ Error: .env-key not found."
    echo "Please create a .env-key file with a strong password first."
    exit 1
fi

if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local not found. Nothing to encrypt."
    exit 0
fi

KEY=$(cat .env-key)

# Encrypt .env.local to .env.enc
# Using PBKDF2 for better security
openssl enc -aes-256-cbc -salt -in .env.local -out .env.enc -pass pass:"$KEY" -pbkdf2

if [ $? -eq 0 ]; then
    echo "✅ .env.local encrypted successfully to .env.enc"
else
    echo "❌ Encryption failed."
    exit 1
fi
