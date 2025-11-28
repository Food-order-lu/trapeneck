#!/bin/bash
# Script to add .nojekyll to the out directory after Next.js build
# This prevents GitHub Pages from using Jekyll processing

touch out/.nojekyll
echo "✅ Created .nojekyll file in out directory"
