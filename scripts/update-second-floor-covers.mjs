import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Define directories
const artifactDir = '/Users/cfh00896102/.gemini/antigravity-ide/brain/98a054ed-8c0f-4d6a-a71b-821daa097b11';
const targetDir = '/Users/cfh00896102/Github/Recipe/public/images/recipes';
const contentDirs = [
  '/Users/cfh00896102/Github/Recipe/src/content/recipes',
  '/Users/cfh00896102/Github/Recipe/src/content/recipes-en',
  '/Users/cfh00896102/Github/Recipe/src/content/recipes-ja',
  '/Users/cfh00896102/Github/Recipe/src/content/recipes-ko'
];

async function run() {
  if (!fs.existsSync(artifactDir)) {
    console.error(`Artifact directory does not exist: ${artifactDir}`);
    return;
  }

  // Get all files from artifact directory
  const files = fs.readdirSync(artifactDir);
  // The tool saves generated files as png with a timestamp suffix (e.g. sf_xxx_123.png)
  const sfFiles = files.filter(f => f.startsWith('sf_') && f.endsWith('.png'));

  console.log(`Found ${sfFiles.length} generated PNG images in artifacts.`);

  for (const file of sfFiles) {
    // Extract base name without the random suffix and file extension
    // e.g. sf_keto_surf_and_turf_platter_1780969827386.png -> sf_keto_surf_and_turf_platter
    const baseNameMatch = file.match(/^(sf_[a-z0-9_]+)_[0-9]+\.png$/);
    if (!baseNameMatch) {
      console.warn(`File name does not match expected pattern: ${file}`);
      continue;
    }
    
    const baseName = baseNameMatch[1];
    // Convert snake_case to kebab-case
    const targetFileName = baseName.replace(/_/g, '-') + '.webp';
    const sourcePath = path.join(artifactDir, file);
    const destinationPath = path.join(targetDir, targetFileName);

    // Convert PNG to WebP using cwebp command
    try {
      console.log(`Converting ${file} -> ${targetFileName}...`);
      execSync(`/usr/local/bin/cwebp -q 80 "${sourcePath}" -o "${destinationPath}"`, { stdio: 'inherit' });
    } catch (err) {
      console.error(`Failed to convert ${file} using cwebp:`, err);
      continue;
    }

    // Update markdown frontmatter
    const slug = targetFileName.replace('.webp', '');
    
    for (const contentDir of contentDirs) {
      if (!fs.existsSync(contentDir)) continue;

      const mdPath = path.join(contentDir, `${slug}.md`);
      if (fs.existsSync(mdPath)) {
        let content = fs.readFileSync(mdPath, 'utf-8');
        
        // Replace .svg with .webp in coverImage field
        const originalPattern = `coverImage: /images/recipes/${slug}.svg`;
        const targetPattern = `coverImage: /images/recipes/${slug}.webp`;

        if (content.includes(originalPattern)) {
          content = content.replace(originalPattern, targetPattern);
          fs.writeFileSync(mdPath, content, 'utf-8');
          console.log(`Updated frontmatter in ${path.basename(contentDir)}/${slug}.md`);
        }
      }
    }
  }

  console.log('Update completed successfully.');
}

run().catch(console.error);
