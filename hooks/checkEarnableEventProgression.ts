import {
  EventCriteria,
  EventDatabase,
  HabitatKey,
  RarityKey,
  UserEventProgressUpdate,
} from "@/supabase/schema";

const rarityPoints = {
  Common: 10,
  Uncommon: 20,
  Rare: 50,
  "Very Rare": 100,
  Unique: 1000,
};

type Handler = (args: {
  isInserting: boolean;
  entryCount: number;
  rarity: RarityKey;
  habitat: HabitatKey;
  progress: EventCriteria;
}) => EventCriteria | undefined;

const handleScore: Handler = ({ isInserting, rarity, progress }) => {
  if ("score" in progress) {
    let formattedRarity = rarity.replace(/\b\w/g, (c) =>
      c.toUpperCase()
    ) as keyof typeof rarityPoints;

    if (isInserting) {
      return { score: progress.score + rarityPoints[formattedRarity] };
    } else {
      return { score: progress.score - rarityPoints[formattedRarity] };
    }
  }
};

const handleCount: Handler = ({ isInserting, entryCount, progress }) => {
  if (
    "count" in progress &&
    !("rarity" in progress) &&
    !("habitat" in progress)
  ) {
    if (isInserting) {
      return { count: progress.count + entryCount };
    } else {
      return { count: progress.count - entryCount };
    }
  }
};

const handleRarityCount: Handler = ({ isInserting, rarity, progress }) => {
  if ("rarity" in progress) {
    let tempCount = progress.count;
    progress.rarity.map((r, index) => {
      if (r === rarity) {
        if (isInserting) {
          tempCount[index] += 1;
        } else {
          tempCount[index] -= 1;
        }
      }
    });
    return { rarity: progress.rarity, count: tempCount };
  }
};

const handleHabitatCount: Handler = ({ isInserting, habitat, progress }) => {
  if ("habitat" in progress) {
    let tempCount = progress.count;
    progress.habitat.map((h, index) => {
      if (h === habitat) {
        if (isInserting) {
          tempCount[index] += 1;
        } else {
          tempCount[index] -= 1;
        }
      }
    });
    return { habitat: progress.habitat, count: tempCount };
  }
};

/**
 * @description A function that takes in various details of a new entry submission and returns updated progress for any applicable events
 * @param user_id as string
 * @param isInserting as boolean
 * @param entryCount as number
 * @param rarity as RarityKey
 * @param habitat as HabitatKey
 * @param events as EventDatabase[]
 * @returns UserEventProgressUpdate[]
 */
export default function checkEarnableEventProgression(
  user_id: string,
  isInserting: boolean,
  entryCount: number,
  rarity: RarityKey,
  habitat: HabitatKey,
  events: EventDatabase[]
): UserEventProgressUpdate[] {
  //Currently 4 types of criteria/progress
  //{"score": 500}
  //{"count":5}
  //{"count": [5], "rarity": ["common"]}
  //{"count": [3], "habitat": ["tundra"]}
  const handlers: Handler[] = [
    handleScore,
    handleCount,
    handleRarityCount,
    handleHabitatCount,
  ];

  let result = events
    .map((event) => {
      for (const h of handlers) {
        const patch = h({
          isInserting,
          entryCount,
          rarity,
          habitat,
          progress: event.progress,
        });
        if (patch) {
          // mutate the original progress
          Object.assign(event.progress, patch);
          return {
            event_id: event.id,
            user_id: user_id,
            progress: event.progress,
          };
        }
      }
      // no handler applied, drop later
      return null;
    })
    .filter((e): e is UserEventProgressUpdate => e !== null);
  return result;
}
