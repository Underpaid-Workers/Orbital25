import {
  MapMarkerCommon,
  MapMarkerRare,
  MapMarkerUncommon,
  MapMarkerUnique,
  MapMarkerVeryRare,
} from "@/constants/Image";
import { ImageURISource } from "react-native";

const markers = {
  common: MapMarkerCommon,
  uncommon: MapMarkerUncommon,
  rare: MapMarkerRare,
  very_rare: MapMarkerVeryRare,
  unique: MapMarkerUnique,
};

/**
 * @description A function that takes in a rarity and returns the corresponding marker image
 * @param rarity as string
 * @returns marker image as ImageURISource
 */
export default function formatRarityToMapMarker(
  rarity: string
): ImageURISource {
  switch (rarity) {
    case "Common":
      return markers.common;
    case "Uncommon":
      return markers.uncommon;
    case "Rare":
      return markers.rare;
    case "Very Rare":
      return markers.very_rare;
    case "Unique":
      return markers.unique;
    default:
      return markers.common;
  }
}
