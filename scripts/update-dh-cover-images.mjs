import fs from 'fs';
import path from 'path';

// Define the root directory for content
const contentDir = './src/content';
const languages = ['recipes', 'recipes-en', 'recipes-ja', 'recipes-ko'];

// Process each language folder
languages.forEach((lang) => {
  const dirPath = path.join(contentDir, lang);
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return;
  }

  // Read all files in the directory
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    // Only target Dubu House recipes (dh-*.md)
    if (file.startsWith('dh-') && file.endsWith('.md')) {
      const filePath = path.join(dirPath, file);
      let content = fs.readFileSync(filePath, 'utf-8');

      // Replace coverImage extension from .svg to .webp
      const updatedContent = content.replace(
        /coverImage:\s*\/images\/recipes\/(dh-[\w-]+)\.svg/g,
        'coverImage: /images/recipes/$1.webp'
      );

      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf-8');
        console.log(`Updated frontmatter in: ${filePath}`);
      }
    }
  });
});

console.log('Frontmatter update completed!');
