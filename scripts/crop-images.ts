import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface GridConfig {
  filename: string;
  rows: number;
  cols: number;
}

const grids: GridConfig[] = [
  {
    filename: 'ChatGPT Image Jan 17, 2026, 11_38_58 AM.png',
    rows: 2,
    cols: 2,
  },
  {
    filename: 'ChatGPT Image Jan 17, 2026, 11_42_42 AM.png',
    rows: 6,
    cols: 4,
  },
  // Skipping 11_43_30 (duplicate of 11_42_42)
  {
    filename: 'ChatGPT Image Jan 17, 2026, 11_48_55 AM.png',
    rows: 5,
    cols: 3,
  },
  {
    filename: 'ChatGPT Image Jan 17, 2026, 11_49_00 AM.png',
    rows: 5,
    cols: 3,
  },
  {
    filename: 'ChatGPT Image Jan 17, 2026, 11_49_12 AM.png',
    rows: 8,
    cols: 4,
  },
];

async function cropGridImages() {
  const sourceDir = join(__dirname, '..');
  const outputDir = join(__dirname, '..', 'cropped');

  // Create output directory
  await mkdir(outputDir, { recursive: true });

  console.log('Starting image cropping...\n');

  for (const grid of grids) {
    const inputPath = join(sourceDir, grid.filename);

    console.log(`Processing: ${grid.filename}`);
    console.log(`Grid size: ${grid.rows} rows x ${grid.cols} cols\n`);

    try {
      // Load image and get dimensions
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      if (!metadata.width || !metadata.height) {
        console.error(`Could not get dimensions for ${grid.filename}`);
        continue;
      }

      const cellWidth = Math.floor(metadata.width / grid.cols);
      const cellHeight = Math.floor(metadata.height / grid.rows);

      console.log(
        `Image size: ${metadata.width}x${metadata.height}px`
      );
      console.log(`Cell size: ${cellWidth}x${cellHeight}px`);

      let count = 0;

      // Extract each cell
      for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
          const left = col * cellWidth;
          const top = row * cellHeight;

          // Create output filename
          const baseFilename = grid.filename.replace('.png', '');
          const outputFilename = `${baseFilename}_r${row}_c${col}.png`;
          const outputPath = join(outputDir, outputFilename);

          // Extract and save cell
          await sharp(inputPath)
            .extract({
              left,
              top,
              width: cellWidth,
              height: cellHeight,
            })
            .toFile(outputPath);

          count++;
        }
      }

      console.log(`Extracted ${count} images from ${grid.filename}\n`);
    } catch (error) {
      console.error(`Error processing ${grid.filename}:`, error);
    }
  }

  console.log('Cropping complete! Check the "cropped" directory.');
}

cropGridImages().catch(console.error);
