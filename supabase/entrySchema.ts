//Full entry fetched to local
export interface Entry {
  id: number;
  name: string;
  datetime: string;
  image: string;
  environmentType: string;
  speciesType: string;
  rarity: string;
  location: { lat: number; long: number };
  description: string;
  height: string;
  weight: string;
  lifespan: string;
  observations: string;
}

//Locally stored entry information
export interface LocalEntry {
  datetime: string;
  image: string;
  location: { lat: number; long: number };
  observations: string;
}

export interface EntryMetadata {
  name: string;
  environmentType: string;
  speciesType: string;
  rarity: string;
  description: string;
  height: string;
  weight: string;
  lifespan: string;
}

export default Entry;
