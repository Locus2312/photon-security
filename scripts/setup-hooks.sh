#!/bin/bash

# Ensure we are in the root directory
cd "$(dirname "$0")/.."

# Pre-push hook: Encrypt before pushing
cat > .git/hooks/pre-push <<EOF
#!/bin/bash
npm run env:encrypt
EOF

# Post-merge hook: Decrypt after pulling/merging
cat > .git/hooks/post-merge <<EOF
#!/bin/bash
npm run env:decrypt
EOF

# Post-checkout hook: Decrypt after switching branches
cat > .git/hooks/post-checkout <<EOF
#!/bin/bash
npm run env:decrypt
EOF

# Make hooks executable
chmod +x .git/hooks/pre-push .git/hooks/post-merge .git/hooks/post-checkout

echo "✅ Git hooks installed successfully."
echo "Environment variables will now be encrypted on push and decrypted on pull/checkout."
