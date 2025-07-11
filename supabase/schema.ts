interface Stats {
  rarity: {
    rare: number;
    common: number;
    unique: number;
    uncommon: number;
    "very rare": number;
  };
  envType: { flying: number; aquatic: number; terrestrial: number };
  streakDays: number;
  speciesType: { plant: number; animal: number };
}

export interface User {
  email: string;
  username: string;
  entrycount: number;
  speciescount: number;
  score: number;
  stats: Stats;
}

type RarityKey = keyof Stats["rarity"]; // "rare"|"common"|...
type EnvTypeKey = keyof Stats["envType"]; // "flying"|"aquatic"|"terrestrial"
type SpeciesTypeKey = keyof Stats["speciesType"]; // "plant"|"animal"
export type ProgressionCriteria =
  | { score: number } // threshold on User.score
  | { streakDays: number } // streakDays from Stats
  | { rarity: RarityKey; count: number } // {"rarity":"rare","count":5}
  | { envTypes: EnvTypeKey[] } // {"envTypes":["aquatic","flying"]}
  | { speciesType: SpeciesTypeKey; count?: number }; // {"speciesType":"plant","count":10}

export interface Badge {
  id: string;
  code: string;
  name: string;
  description: string;
  image_url: string;
  badge_type: string;
  earned_at: string | null;
  criteria: ProgressionCriteria; //TODO: change this to better fit the jsonb schema!
}

//Full entry fetched to local
export interface EntryLocal {
  id: number;
  name: string;
  datetime: string;
  image: string;
  environmentType: string;
  speciesType: string;
  rarity: string;
  habitat: string;
  location: { lat: number; long: number };
  description: string;
  height: string;
  weight: string;
  lifespan: string;
  observations: string;
}

export interface EntryMetadata {
  name: string;
  environmentType: string;
  speciesType: string;
  rarity: string;
  habitat: string;
  description: string;
  height: string;
  weight: string;
  lifespan: string;
}

export interface EntryDatabase {
  user_id: string;
  entry_id: number;
  name: string;
  datetime: string;
  image_url: string;
  species_type: string;
  env_type: string;
  rarity: string;
  habitat: string;
  location: string;
  description: string;
  height: string;
  weight: string;
  lifespan: string;
  observations: string;
}

export type ResponseState = {
  success: boolean;
  message?: string;
  data?: any;
};

export default EntryLocal;
