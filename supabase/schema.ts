export interface Stats {
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
  habitat: {
    forest: number;
    grassland: number;
    wetland: number;
    desert: number;
    mountains: number;
    coastal: number;
    oceanic: number;
    freshwater: number;
    urban: number;
    caves: number;
    tundra: number;
  };
}

export interface User {
  email: string;
  username: string;
  entrycount: number;
  speciescount: number;
  score: number;
  stats: Stats;
}

export type RarityKey = keyof Stats["rarity"];
export type EnvTypeKey = keyof Stats["envType"];
export type SpeciesTypeKey = keyof Stats["speciesType"];
export type HabitatKey = keyof Stats["habitat"];

export type ProgressionCriteria =
  | { score: number } // threshold on User.score
  | { streakDays: number } // streakDays from Stats
  | { rarity: RarityKey; count: number } // {"rarity":"rare","count":5}
  | { envTypes: EnvTypeKey[] } // {"envTypes":["aquatic","flying"]}
  | { speciesType: SpeciesTypeKey; count?: number } // {"speciesType":"plant","count":10}
  | { habitat: HabitatKey; count?: number };

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

export interface Event {
  id: string;
  title: string;
  description: string;
  end_time: string;
  frequency: string;
  image: string;
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
