# Morning Cup of Yo

A Next.js website that displays one daily meme image with embedded funny quotes. Each user gets their own random meme on their first visit of the day, which stays the same for them all day via localStorage.

## Features

- Random daily meme selection per user
- Persistent meme display throughout the day (localStorage)
- Responsive design with Tailwind CSS
- Image storage via Supabase Storage
- Fast loading with Next.js Image optimization

## Tech Stack

- Next.js 15 with TypeScript
- Tailwind CSS
- Supabase Storage
- pnpm package manager

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Supabase

1. Go to your Supabase project dashboard
2. Navigate to Storage
3. Create a new public bucket named `meme-images`
4. Get your credentials from Settings > API:
   - Project URL (already set: `https://zwawcuxagpkdxpgquiag.supabase.co`)
   - Anon/Public key
   - Service role key (for upload script)

### 3. Set Environment Variables

Edit `.env.local` and add your Supabase keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://zwawcuxagpkdxpgquiag.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
```

### 4. Prepare and Upload Images

Add your curated meme images to the project:

1. Create the curated folder in the project root: `curated/`
2. Copy your top 10 meme images into this folder
3. Rename them sequentially: `001.png`, `002.png`, `003.png`, ..., `010.png`

#### Upload to Supabase

```bash
# Install script dependencies
cd scripts
pnpm install

# Upload curated images to Supabase Storage
pnpm upload
```

This uploads your curated images to Supabase Storage at `meme-images/active/`.

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Per-User Random Selection

- On first visit of the day, each user gets a random meme via `Math.random()`
- The selection (index + URL) is cached in localStorage with today's date
- Subsequent visits same day return the cached image
- Next day: date doesn't match, new random selection occurs

### File Structure

```
morning-cup-of-yo/
├── scripts/              # Image processing scripts
│   ├── crop-images.ts    # Extract memes from grids
│   ├── upload-to-supabase.ts
│   └── package.json
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout + metadata
│   │   ├── page.tsx      # Main page
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx    # Site header
│   │   └── MemeDisplay.tsx # Main meme display logic
│   ├── lib/
│   │   ├── supabase.ts   # Supabase client
│   │   ├── daily-selector.ts # Random selection
│   │   └── storage.ts    # localStorage helpers
│   └── types/
│       └── index.ts
├── curated/              # Your top 10 meme images (gitignored)
└── .env.local           # Environment variables (gitignored)
```

## Deployment

### Deploy to Vercel

```bash
pnpm build  # Test build locally first
vercel      # Deploy to preview
vercel --prod # Deploy to production
```

### Environment Variables on Vercel

Add these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Testing Checklist

- [ ] First visit loads a random meme
- [ ] Refresh shows same meme (localStorage)
- [ ] Clear localStorage → different random meme appears
- [ ] Works on mobile viewport
- [ ] Image loads quickly (<2s)
- [ ] Different devices show different random images
- [ ] Same device shows same image all day

## License

MIT
