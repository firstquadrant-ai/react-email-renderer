# Get the contents of react-email-renderer.css
CSS_CONTENTS_ORIGINAL=$(<react-email-renderer.css)

# Remove newlines from the CSS contents and minify
CSS_CONTENTS=$(echo "$CSS_CONTENTS_ORIGINAL" | tr -d '\n' | sed 's/\*/\\*/g' | sed 's/{  /{/g' | sed 's/;  /;/g')

# Replace the string "INJECT_CSS" in the file dist/react-email-renderer.js with the contents of react-email-renderer.css
sed -i '' "s/INJECT_CSS/$CSS_CONTENTS/g" dist/react-email-renderer.js
