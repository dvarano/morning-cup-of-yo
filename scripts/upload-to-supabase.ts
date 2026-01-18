import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nPlease set these in your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = 'meme-images';
const STORAGE_PATH = 'active';

async function uploadCuratedImages() {
  const curatedDir = join(__dirname, '..', 'curated');

  console.log('Starting upload to Supabase Storage...\n');
  console.log(`Bucket: ${BUCKET_NAME}`);
  console.log(`Path: ${STORAGE_PATH}\n`);

  try {
    // Read all files from curated directory
    const files = await readdir(curatedDir);
    const pngFiles = files.filter((file) => file.endsWith('.png')).sort();

    if (pngFiles.length === 0) {
      console.error('No PNG files found in curated directory!');
      console.error('Please add your curated images to the "curated" folder.');
      process.exit(1);
    }

    console.log(`Found ${pngFiles.length} images to upload:\n`);

    for (const filename of pngFiles) {
      const filePath = join(curatedDir, filename);
      const fileBuffer = await readFile(filePath);

      const storagePath = `${STORAGE_PATH}/${filename}`;

      console.log(`Uploading: ${filename}...`);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          contentType: 'image/png',
          upsert: true, // Overwrite if exists
        });

      if (error) {
        console.error(`Error uploading ${filename}:`, error.message);
      } else {
        console.log(`Successfully uploaded: ${storagePath}`);

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);

        console.log(`Public URL: ${publicUrl}\n`);
      }
    }

    console.log('Upload complete!');
  } catch (error) {
    console.error('Error during upload:', error);
    process.exit(1);
  }
}

uploadCuratedImages().catch(console.error);
