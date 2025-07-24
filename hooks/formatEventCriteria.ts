import { EventCriteria } from "@/supabase/schema";

type Formatter = (args: {
  criteria: EventCriteria;
  progress: EventCriteria;
}) => { current: number; total: number } | undefined;

const formatScore: Formatter = ({ criteria, progress }) => {
  if ("score" in criteria && "score" in progress) {
    return { current: progress.score, total: criteria.score };
  }
};

const formatCount: Formatter = ({ criteria, progress }) => {
  if (
    "count" in criteria &&
    !("rarity" in criteria) &&
    !("habitat" in criteria) &&
    "count" in progress &&
    !("rarity" in progress) &&
    !("habitat" in progress)
  ) {
    return { current: progress.count, total: criteria.count };
  }
};

const formatSpeciesCount: Formatter = ({ criteria, progress }) => {
  if ("species" in criteria && "species" in progress) {
    return { current: progress.species, total: criteria.species };
  }
};

const formatRarityCount: Formatter = ({ criteria, progress }) => {
  if ("rarity" in criteria && "rarity" in progress) {
    return {
      current: progress.count.reduce((a, b) => a + b, 0),
      total: criteria.count.reduce((a, b) => a + b, 0),
    };
  }
};

const formatHabitatCount: Formatter = ({ criteria, progress }) => {
  if ("habitat" in criteria && "habitat" in progress) {
    return {
      current: progress.count.reduce((a, b) => a + b, 0),
      total: criteria.count.reduce((a, b) => a + b, 0),
    };
  }
};

export default function formatEventCriteria(
  criteria: EventCriteria,
  progress: EventCriteria
): { current: number; total: number } {
  const formatters: Formatter[] = [
    formatScore,
    formatCount,
    formatSpeciesCount,
    formatRarityCount,
    formatHabitatCount,
  ];

  for (const fmt of formatters) {
    const result = fmt({ criteria, progress });
    if (result !== undefined) {
      return result;
    }
  }
  console.error("Unrecognized EventCriteria combination");
  return { current: 0, total: 0 };
}
