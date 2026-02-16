#!/bin/bash
# Copy all HTML files from Pages/ to public/pages/ with URL-safe filenames
# Replaces colons, ampersands, spaces, parentheses with hyphens

SRC="Pages"
DEST="public/pages"

mkdir -p "$DEST"

for f in "$SRC"/*.html; do
    basename=$(basename "$f")
    # Convert to URL-safe: lowercase, replace special chars with hyphens, collapse multiple hyphens
    safe_name=$(echo "$basename" | \
        tr '[:upper:]' '[:lower:]' | \
        sed 's/:/-/g' | \
        sed 's/&/-/g' | \
        sed 's/ /-/g' | \
        sed 's/(//g' | \
        sed 's/)//g' | \
        sed 's/_/-/g' | \
        sed 's/--*/-/g' | \
        sed 's/-\./\./g')
    echo "  $basename -> $safe_name"
    cp "$f" "$DEST/$safe_name"
done

echo ""
echo "Done! Copied $(ls "$DEST"/*.html | wc -l) files to $DEST/"
