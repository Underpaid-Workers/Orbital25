const colors = {
  common: ["#DADADA", "#BFBFBF"],
  uncommon: ["#A0D4A0", "#82C382"],
  rare: ["#8DC8C0", "#6BB4AA"],
  very_rare: ["#B8AEDC", "#C8B6E2"],
  unique: ["#F0DC82", "#C6E0E0"],
} as const;

/**
 * @description Converts the rarity to the respective color gradient
 * @param rarity as "Common", "Uncommon", "Rare", "Very Rare", "Unique"
 * @returns [color1, color2] as string array of length 2
 * @default returns ["#DADADA", "#BFBFBF"]
 */
export default function formatRarityToGradient(rarity: string) {
  switch (rarity) {
    case "Common":
      return colors.common;
    case "Uncommon":
      return colors.uncommon;
    case "Rare":
      return colors.rare;
    case "Very Rare":
      return colors.very_rare;
    case "Unique":
      return colors.unique;
    default:
      return colors.common;
  }
}
