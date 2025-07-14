import { Badge, Stats } from "@/supabase/schema";

type Handler = (args: {
  criteria: Badge["criteria"];
  entryCount: number;
  speciesCount: number;
  score: number;
  stats: Stats;
}) => boolean | undefined;

const handleStreak: Handler = ({ criteria, stats }) => {
  if (!("streakDays" in criteria)) return undefined;
  return stats.streakDays >= criteria.streakDays;
};

const handleScore: Handler = ({ criteria, score }) => {
  if (!("score" in criteria)) return undefined;
  return score >= criteria.score;
};

const handleMilestone: Handler = ({ criteria, stats }) => {
  if (!("count" in criteria && "rarity" in criteria)) return undefined;
  return stats.rarity[criteria.rarity] >= criteria.count;
};

const handleDiversity: Handler = ({ criteria, stats }) => {
  if (!("envTypes" in criteria)) return undefined;
  return criteria.envTypes.every((t) => stats.envType[t] > 0);
};

export default function checkEarnableProgressionBadges(
  entryCount: number,
  speciesCount: number,
  score: number,
  stats: Stats,
  badges: Badge[]
) {
  //Currently 4 types of progression badges
  //{"streakDays": 1}, code: streak_{number}
  //{"score": 500}, code: score_{number}
  //{"count": 5, "rarity": "common"} code: milestone_{number}_{rarity}
  //{"envTypes": [ "terrestrial", "aquatic", "flying"]} code: diversity_land_sea_air
  const handlers: Handler[] = [
    handleStreak,
    handleScore,
    handleMilestone,
    handleDiversity,
  ];
  return badges.reduce<string[]>((earned, badge) => {
    const { criteria, code } = badge;
    let handled = false;

    for (const handler of handlers) {
      const result = handler({
        criteria,
        entryCount,
        speciesCount,
        score,
        stats,
      });

      //wrong handler, continue
      if (result === undefined) {
        continue;
      }

      //handler found
      handled = true;
      if (result) {
        earned.push(code);
      }
      break; // stop after the first applicable handler
    }

    if (!handled) {
      console.error("No handler for badge criteria:", criteria);
    }

    return earned;
  }, []);
}
