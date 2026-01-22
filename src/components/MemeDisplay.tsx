'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { getLocalDateString, getRandomMemeIndex } from '@/lib/daily-selector';
import { getTodaysMeme, setTodaysMeme } from '@/lib/storage';

const TOTAL_MEMES = 16;

export default function MemeDisplay() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const today = getLocalDateString();
    const cached = getTodaysMeme(today);

    if (cached) {
      // Use cached image from localStorage
      setImageUrl(cached.imageUrl);
      setIsLoading(false);
    } else {
      // First visit of the day - pick random image
      const index = getRandomMemeIndex(TOTAL_MEMES);
      const filename = String(index + 1).padStart(3, '0') + '.png';

      const { data } = supabase.storage
        .from('meme-images')
        .getPublicUrl(`active/${filename}`);

      setTodaysMeme(today, index, data.publicUrl);
      setImageUrl(data.publicUrl);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-orange-600 text-xl">
          Loading your daily meme...
        </div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="text-center text-red-600">
        Failed to load meme. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <div className="relative w-full aspect-square rounded-lg shadow-2xl overflow-hidden bg-white">
        <Image
          src={imageUrl}
          alt="Daily meme"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>
    </div>
  );
}
