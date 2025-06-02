//Full entry fetched to local
export interface FetchEntry {
  id: number;
  name: string;
  datetime: string;
  image: string;
  speciesType: string;
  environmentType: string;
  description: string;
  height: string;
  weight: string;
  lifespan: string;
  observations: string;
}

//Locally stored entry information
export interface LocalInsertEntry {
  datetime: string;
  image: string;
  observations: string;
}

//Scheme for API fetch data!
export interface InsertEntryMetadata {
  name: string;
  environmentType: string;
  speciesType: string;
  description: string;
  height: string;
  weight: string;
  lifespan: string;
}

//Full entry with API metadata to be sent to main database (for Inserting)
export interface FullInsertEntry {
  id: number;
  name: string;
  dateTime: string;
  image: string;
  environmentType: string;
  speciesType: string;
  description: string;
  height: string;
  weight: string;
  lifespan: string;
  observations: string;
}

export default FetchEntry;
