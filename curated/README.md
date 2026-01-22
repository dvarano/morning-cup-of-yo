# Curated Memes - Image Management

This folder contains the curated meme images used by the Morning Cup of Yo website.

## Current Setup

- Images are stored in Supabase Storage (`meme-images` bucket, `active/` folder)
- Images are named with 3-digit zero-padded numbers: `001.png`, `002.png`, `003.png`, etc.
- The app randomly selects one image per day from the available pool
- The total number of images is configured in `src/components/MemeDisplay.tsx`

## Adding New Images - Step by Step

### 1. Add image to curated folder

Copy your new image to this folder with the next sequential number:

```powershell
# If you have 001-010, the next would be 011.png
copy "path\to\your\new-meme.png" curated\011.png
```

**Important**: Use 3-digit zero-padded naming (001, 002, ..., 010, 011, etc.)

### 2. Upload to Supabase Storage

- Go to your Supabase dashboard
- Navigate to: Storage → `meme-images` bucket → `active/` folder
- Upload the new image file (e.g., `011.png`)

### 3. Update the code

Edit `src/components/MemeDisplay.tsx` and increment the `TOTAL_MEMES` constant:

```typescript
const TOTAL_MEMES = 11; // Update this number to match total images
```

**Location**: Line 9 in `src/components/MemeDisplay.tsx`

### 4. Deploy changes

```powershell
git add curated\011.png src\components\MemeDisplay.tsx
git commit -m "Add new daily meme #011"
git push
```

## Quick Reference

| Item | Value |
|------|-------|
| Local folder | `curated/` |
| Naming format | `001.png`, `002.png`, etc. (3 digits) |
| Supabase bucket | `meme-images` |
| Supabase path | `active/` |
| Code constant | `src/components/MemeDisplay.tsx:9` |

## Folder Structure

```
morning-cup-of-yo/
├── pics/          # Raw/source images (working folder)
└── curated/       # Ready-to-use images (numbered 001, 002, etc.)
```

## Notes

- Keep source/original images in the `pics/` folder
- Only move images to `curated/` when they're ready to go live
- The app caches the daily meme in localStorage, so users see the same image all day
- Images reset at midnight (local time)
