import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Load API key from environment variable
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Error: GEMINI_API_KEY environment variable is not set.');
  process.exit(1);
}

const rootDir = '.';
const recipesDir = path.join(rootDir, 'src/content/recipes');
const trackerPath = path.join(rootDir, 'docs/recipe-cover-images-for-gemini-second-floor-70.md');
const tempDir = path.join(rootDir, 'tmp_images_sf');
const outputDir = path.join(rootDir, 'public/images/recipes');
const contentDirs = [
  path.join(rootDir, 'src/content/recipes'),
  path.join(rootDir, 'src/content/recipes-en'),
  path.join(rootDir, 'src/content/recipes-ja'),
  path.join(rootDir, 'src/content/recipes-ko')
];

// Ensure directories exist
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Scan for Second Floor recipes that still have .svg cover image
console.log('Scanning for recipes with SVG placeholders...');
const files = fs.readdirSync(recipesDir);
const pendingSlugs = [];

for (const file of files) {
  if (file.startsWith('sf-') && file.endsWith('.md')) {
    const filePath = path.join(recipesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if coverImage is .svg
    if (content.includes('coverImage: /images/recipes/sf-') && content.includes('.svg')) {
      const slug = file.replace('.md', '');
      pendingSlugs.push(slug);
    }
  }
}

console.log(`Found ${pendingSlugs.length} pending Second Floor recipes:`, pendingSlugs);

if (pendingSlugs.length === 0) {
  console.log('No pending Second Floor recipes found with SVG cover images. Exiting.');
  process.exit(0);
}

// 2. Read tracker and extract prompts using Regex
console.log('Extracting prompts from the tracking document...');
const trackerContent = fs.readFileSync(trackerPath, 'utf-8');
const promptMap = new Map();

// Pattern to match: #### [Number]. [Title] — `[slug].webp` followed by a text block containing the prompt
const regex = /####\s+\d+\.\s+.*?—\s+`([a-z0-9-]+)\.webp`[\s\S]*?```text\s*([\s\S]*?)\s*```/g;
let match;
while ((match = regex.exec(trackerContent)) !== null) {
  const slug = match[1];
  const prompt = match[2].trim();
  promptMap.set(slug, prompt);
}

console.log(`Extracted ${promptMap.size} prompts from the tracking document.`);

// 3. Generate images for the pending slugs
for (const slug of pendingSlugs) {
  const prompt = promptMap.get(slug);
  if (!prompt) {
    console.error(`Error: Could not find prompt for slug: ${slug}`);
    continue;
  }

  console.log(`Generating cover image for: ${slug}...`);
  
  const payload = {
    instances: [
      {
        prompt: prompt
      }
    ],
    parameters: {
      sampleCount: 1,
      aspectRatio: "4:3",
      outputMimeType: "image/png"
    }
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error for ${slug}: ${response.status} - ${errorText}`);
      continue;
    }

    const data = await response.json();
    const base64Image = data.predictions?.[0]?.bytesBase64Encoded;
    if (!base64Image) {
      console.error(`Error: No image bytes returned for ${slug}`);
      continue;
    }

    // Save temporary PNG
    const tempPngPath = path.join(tempDir, `${slug}.png`);
    const buffer = Buffer.from(base64Image, 'base64');
    fs.writeFileSync(tempPngPath, buffer);

    // Convert to WebP using Python Pillow
    const destWebpPath = path.join(outputDir, `${slug}.webp`);
    console.log(`Converting temporary PNG to WebP...`);
    const pythonCmd = `python3 -c "from PIL import Image; Image.open('${tempPngPath}').save('${destWebpPath}', 'webp')"`;
    execSync(pythonCmd);

    // Clean up temporary PNG
    fs.unlinkSync(tempPngPath);
    console.log(`Successfully created: ${destWebpPath}`);

    // Update markdown frontmatter across all locales
    for (const contentDir of contentDirs) {
      const mdPath = path.join(contentDir, `${slug}.md`);
      if (fs.existsSync(mdPath)) {
        let mdContent = fs.readFileSync(mdPath, 'utf-8');
        const originalPattern = `coverImage: /images/recipes/${slug}.svg`;
        const targetPattern = `coverImage: /images/recipes/${slug}.webp`;
        
        if (mdContent.includes(originalPattern)) {
          mdContent = mdContent.replace(originalPattern, targetPattern);
          fs.writeFileSync(mdPath, mdContent, 'utf-8');
          console.log(`Updated frontmatter in: ${path.basename(contentDir)}/${slug}.md`);
        }
      }
    }

  } catch (error) {
    console.error(`Exception while processing ${slug}:`, error.message);
  }
}

// Clean up temp directory if empty
if (fs.existsSync(tempDir)) {
  const filesLeft = fs.readdirSync(tempDir);
  if (filesLeft.length === 0) {
    fs.rmdirSync(tempDir);
  }
}

console.log('All image generation and frontmatter update attempts finished!');
