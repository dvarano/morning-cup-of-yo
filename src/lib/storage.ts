const STORAGE_KEY = 'morningcupofyo_meme';

/**
 * Interface for daily meme data stored in localStorage
 */
export interface DailyMeme {
  date: string;       // YYYY-MM-DD (local date)
  imageIndex: number; // Random index selected for today
  imageUrl: string;   // Full Supabase Storage URL
}

/**
 * Get today's meme from localStorage if it exists and matches today's date
 * @param todayLocal Current date in YYYY-MM-DD format
 * @returns DailyMeme object if cached and valid, null otherwise
 */
export function getTodaysMeme(todayLocal: string): DailyMeme | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data: DailyMeme = JSON.parse(stored);
    return data.date === todayLocal ? data : null;
  } catch {
    return null;
  }
}

/**
 * Save today's meme selection to localStorage
 * @param todayLocal Current date in YYYY-MM-DD format
 * @param imageIndex Random index selected for today
 * @param imageUrl Full Supabase Storage URL
 */
export function setTodaysMeme(
  todayLocal: string,
  imageIndex: number,
  imageUrl: string
): void {
  if (typeof window === 'undefined') return;

  const data: DailyMeme = {
    date: todayLocal,
    imageIndex,
    imageUrl,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
