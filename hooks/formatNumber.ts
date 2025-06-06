/**
 * @description Formats a non-zero padded number "X" into the zero padded "#XXX"
 * @param "X" as string
 * @returns "#XXX" as string
 */
export default function formatNumber(input: string): string {
  // Pad with leading zeros up to 3 characters, then prefix "#"
  const padded = input.padStart(3, "0");
  return `#${padded}`;
}
