export interface User {
  email: string;
  username: string;
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
};

export default EntryLocal;
