import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Load API key from environment variable
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Error: GEMINI_API_KEY environment variable is not set.');
  process.exit(1);
}

// Recipes to generate (DH-53 to DH-58)
const recipes = [
  {
    slug: 'dh-kimchi-tofu-pancake',
    prompt: 'A highly appetizing Korean savory pancake (jeon), generous restaurant portion, featuring a round, golden-brown Korean savory pancake featuring red kimchi bits and crumbled tofu, with crispy edges. Composition: Served on a flat round plate, cut into wedges, accompanied by a small ramekin of soy-sesame dipping sauce. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.'
  },
  {
    slug: 'dh-seafood-pancake',
    prompt: 'A highly appetizing Korean savory pancake (jeon), generous restaurant portion, featuring a large, round, golden-brown crispy Korean seafood pancake stuffed with whole white shrimp, squid rings, and green scallions. Composition: Served on a wooden board, showing crispy texture and colorful seafood, warm kitchen light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.'
  },
  {
    slug: 'dh-bbq-wrap',
    prompt: "A highly appetizing Korean restaurant chef's special, generous portion, featuring thinly sliced beef short plate stir-fried in a sweet soy-sauce glaze, topped with a massive heap of thin shredded green scallions. Composition: Served in a round ceramic bowl on a dark dining table, close-up highlighting the contrast between glazed beef and fresh green onions. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio."
  },
  {
    slug: 'dh-ox-bone-soup',
    prompt: "A highly appetizing Korean restaurant chef's special, generous portion, featuring a comforting bowl of rich, milky white ox bone soup (seolleongtang) with tender slices of beef brisket and green onion rounds floating on top. Composition: Served in a traditional metal bowl (bangjja yugi) on a wooden table, steam rising, accompanied by a side of rice and radish kimchi (kkakdugi). Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio."
  },
  {
    slug: 'dh-korean-fried-chicken-combo',
    prompt: 'A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring a double portion of crispy Korean fried chicken, half glazed in bright red sweet-and-spicy gochujang sauce and half glazed in a glossy dark brown BBQ sauce. Composition: Served side-by-side in a long rectangular platter on a pub table, garnished with sesame seeds, close-up showcasing both flavors. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.'
  },
  {
    slug: 'dh-truffle-cheese-egg-roll',
    prompt: 'A highly appetizing Korean rolled omelette (gyeran-mari), generous restaurant portion, featuring a thick, golden-yellow layered Korean egg roll filled with melting mozzarella cheese, topped with a drizzle of black truffle paste and cheese sauce. Composition: Served on a slate board, truffle streaks visible on top, elegant modern dining table setting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.'
  }
];

const tempDir = './tmp_images';
const outputDir = './public/images/recipes';

// Ensure directories exist
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate each image
for (const recipe of recipes) {
  console.log(`Generating cover image for: ${recipe.slug}...`);
  
  const payload = {
    instances: [
      {
        prompt: recipe.prompt
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
      console.error(`API Error for ${recipe.slug}: ${response.status} - ${errorText}`);
      continue;
    }

    const data = await response.json();
    const base64Image = data.predictions?.[0]?.bytesBase64Encoded;
    if (!base64Image) {
      console.error(`Error: No image bytes returned for ${recipe.slug}`);
      continue;
    }

    // Save temporary PNG
    const tempPngPath = path.join(tempDir, `${recipe.slug}.png`);
    const buffer = Buffer.from(base64Image, 'base64');
    fs.writeFileSync(tempPngPath, buffer);

    // Convert to WebP using Python Pillow
    const destWebpPath = path.join(outputDir, `${recipe.slug}.webp`);
    console.log(`Converting temporary PNG to WebP...`);
    const pythonCmd = `python3 -c "from PIL import Image; Image.open('${tempPngPath}').save('${destWebpPath}', 'webp')"`;
    execSync(pythonCmd);

    // Clean up temporary PNG
    fs.unlinkSync(tempPngPath);
    console.log(`Successfully created: ${destWebpPath}`);

  } catch (error) {
    console.error(`Exception while processing ${recipe.slug}:`, error.message);
  }
}

// Clean up temp directory if empty
if (fs.existsSync(tempDir)) {
  const files = fs.readdirSync(tempDir);
  if (files.length === 0) {
    fs.rmdirSync(tempDir);
  }
}

console.log('All image generation attempts finished!');
