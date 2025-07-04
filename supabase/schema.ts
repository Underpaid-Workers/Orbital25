export interface User {
  email: string;
  username: string;
}

//Full entry fetched to local
export interface Entry {
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

export type ResponseState = {
  success: boolean;
  message?: string;
};

export default Entry;
