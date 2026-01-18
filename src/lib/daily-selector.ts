/**
 * Get a random meme index from the available images
 * @param totalImages Total number of meme images available
 * @returns Random index between 0 and totalImages-1
 */
export function getRandomMemeIndex(totalImages: number): number {
  return Math.floor(Math.random() * totalImages);
}

/**
 * Get the current date as a string in local timezone (YYYY-MM-DD format)
 * This is used to determine if we need to show a new meme for the day
 * @returns Date string in YYYY-MM-DD format
 */
export function getLocalDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
