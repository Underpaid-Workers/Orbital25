//function to format id as single number string into "#XXX"
export default function useFormatNumber(input: string): string {
  // Pad with leading zeros up to 3 characters, then prefix "#"
  const padded = input.padStart(3, "0");
  return `#${padded}`;
}
