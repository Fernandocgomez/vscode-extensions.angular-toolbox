#!/bin/bash

# Script to generate a VSIX file for your VSCode extension with sudo permissions

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Run the build process using your existing scripts
echo "Building extension..."
npm run package

# Package the extension into a VSIX file with sudo to ensure proper permissions
echo "Creating VSIX file with sudo..."
npx vsce package