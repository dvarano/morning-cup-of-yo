# Setup Notes

## Implementation Status: ✅ COMPLETE & DEPLOYED

The Morning Cup of Yo website is fully implemented and deployed to production!

**Live Site:** https://morning-cup-of-yo.vercel.app

## What's Been Completed

### ✅ Core Application
- Next.js 15 project with TypeScript
- App Router structure (`src/app/`)
- Tailwind CSS v4 configured with PostCSS
- Responsive design with orange/yellow gradient theme

### ✅ Components & Logic
- `Header.tsx` - Site header with title
- `MemeDisplay.tsx` - Main component with random selection logic
- `daily-selector.ts` - Random meme index generator using Math.random()
- `storage.ts` - localStorage caching for per-user daily memes
- `supabase.ts` - Supabase client configuration

### ✅ Image Processing Scripts
- `scripts/crop-images.ts` - Automated grid cropping with sharp
- `scripts/upload-to-supabase.ts` - Batch upload to Supabase Storage
- Scripts package.json with dependencies

### ✅ Configuration Files
- TypeScript configuration (tsconfig.json)
- Next.js configuration (next.config.ts)
- Tailwind CSS v4 with @tailwindcss/postcss
- PostCSS configuration
- Environment variables template (.env.local.example)
- .gitignore (excludes cropped/, curated/, .env files)

## Deployment Summary

### ✅ Completed Deployment (January 17, 2026)

**Production URL:** https://morning-cup-of-yo.vercel.app

**Supabase Project:**
- Project URL: https://fnmazoaqoataskxtvkmm.supabase.co
- Storage Bucket: `meme-images` (public)
- 10 meme images uploaded to `/active` folder

**Vercel Configuration:**
- Environment Variables Set:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Auto-deployed from code
- Production domain: morning-cup-of-yo.vercel.app

**Features Deployed:**
- Random daily meme selection (localStorage caching)
- Responsive header with custom icon
- Gradient title: "Your daily fix of Yo memes"
- Max image width: 600px
- Orange/yellow gradient background theme

## Next Steps (Optional)

### 1. Get Supabase Credentials

Go to your Supabase dashboard at https://zwawcuxagpkdxpgquiag.supabase.co:

1. Navigate to **Settings** > **API**
2. Copy your **anon public** key
3. Copy your **service_role** key (needed for uploads)

### 2. Update Environment Variables

Edit `C:/code/morning-cup-of-yo/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://zwawcuxagpkdxpgquiag.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<paste your anon key here>
SUPABASE_SERVICE_ROLE_KEY=<paste your service role key here>
```

### 3. Create Supabase Storage Bucket

In your Supabase dashboard:

1. Go to **Storage**
2. Click **New bucket**
3. Name: `meme-images`
4. **Public bucket**: YES (important!)
5. Click **Create bucket**

### 4. Prepare and Upload Images

Add your curated meme images to the project:

1. Create the curated folder: `C:/code/morning-cup-of-yo/curated/`
2. Copy your top 10 meme images into this folder
3. Rename them sequentially: `001.png`, `002.png`, `003.png`, ..., `010.png`

Then upload to Supabase:

```bash
# Install script dependencies
cd C:/code/morning-cup-of-yo/scripts
pnpm install

# Upload curated images to Supabase Storage
pnpm upload
```

### 5. Run Development Server

```bash
cd C:/code/morning-cup-of-yo
pnpm dev
```

Visit http://localhost:3000 to see your site!

### 6. Deploy to Vercel

```bash
# Login to Vercel (first time only)
npx vercel login

# Deploy
cd C:/code/morning-cup-of-yo
npx vercel

# When prompted, configure:
# - Link to existing project or create new
# - Set environment variables (use the Vercel dashboard)

# Deploy to production
npx vercel --prod
```

**Important**: Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Known Issues

### Windows Build Path Casing
The local `pnpm build` fails due to Windows path case sensitivity (`C:\Code` vs `C:\code`). This is a local build issue only and does **NOT** affect:
- ✅ Development server (`pnpm dev` works perfectly)
- ✅ Vercel deployment (handles paths correctly)
- ✅ Application functionality

**Workaround**: Deploy directly to Vercel without building locally.

## How It Works

### Per-User Random Selection Architecture

1. **First Visit of the Day**:
   - User opens the site
   - `Math.random()` selects a random image index (0-9)
   - Image URL constructed: `supabase.co/storage/.../active/001.png`
   - Selection cached in localStorage with today's date

2. **Subsequent Visits Same Day**:
   - Check localStorage for today's date
   - If match found, load cached image URL
   - User sees the same meme all day

3. **Next Day**:
   - Date in localStorage doesn't match current date
   - Generate new random selection
   - Update cache with new date and image

**Result**: Each user gets their own random meme that stays consistent for them all day, but different users likely see different memes.

## File Structure

```
morning-cup-of-yo/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page (Header + MemeDisplay)
│   │   └── globals.css         # Tailwind imports
│   ├── components/
│   │   ├── Header.tsx          # "Morning Cup of Yo" title
│   │   └── MemeDisplay.tsx     # Image display with random logic
│   ├── lib/
│   │   ├── daily-selector.ts   # Random index + date helpers
│   │   ├── storage.ts          # localStorage get/set
│   │   └── supabase.ts         # Supabase client
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── scripts/
│   ├── crop-images.ts          # Grid-to-individual cropping
│   ├── upload-to-supabase.ts   # Upload to storage bucket
│   └── package.json            # Script dependencies
├── .env.local                  # Supabase credentials (gitignored)
├── next.config.ts              # Next.js config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
└── package.json                # Main dependencies
```

## Testing Checklist

Once deployed, test these scenarios:

- [ ] First visit shows a random meme
- [ ] Refresh page shows same meme (localStorage working)
- [ ] Clear browser localStorage → different random meme appears
- [ ] Open in different browser → likely different meme
- [ ] Share with friend → they see their own random meme
- [ ] Next day → new random meme appears
- [ ] Mobile responsive design works
- [ ] Image loads quickly (<2 seconds)

## Need Help?

- **Supabase Docs**: https://supabase.com/docs/guides/storage
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Deployment**: https://vercel.com/docs/deployments

All code is complete and ready. Just follow the steps above to configure Supabase and deploy!
