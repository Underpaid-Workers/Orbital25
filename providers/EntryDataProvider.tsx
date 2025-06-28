import { useAuthContext } from "@/providers/AuthProvider";
import deleteEntry from "@/supabase/db_hooks/deleteEntry";
import fetchEntries from "@/supabase/db_hooks/fetchEntries";
import insertEntry from "@/supabase/db_hooks/insertEntry";
import Entry from "@/supabase/schema";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export type EntryData = {
  data: Entry[];
  entryCount: number;
  speciesCount: number;
  score: number;
  loading: boolean;
  getEntries: () => void;
  uploadEntry: (submitting: Entry, onComplete: () => void) => void;
  removeEntry: (id: number, image: string, onComplete: () => void) => void;
};

const EntryDataContext = createContext<EntryData>({
  data: [],
  entryCount: 0,
  speciesCount: 0,
  score: 0,
  loading: false,
  getEntries: () => {},
  uploadEntry: () => {},
  removeEntry: () => {},
});

export default function EntryDataProvider({ children }: PropsWithChildren) {
  const { session } = useAuthContext();
  const [data, setData] = useState<Entry[]>([]);
  const [entryCount, setEntryCount] = useState<number>(0);
  const [speciesCount, setSpeciesCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const getEntries = async () => {
    if (session) {
      console.log("Fetching data...");
      setLoading(true);
      fetchEntries(session)
        .then(
          (result) => {
            //onSuccess
            setData(result.data);
            setEntryCount(result.entryCount);
            setSpeciesCount(result.speciesCount);
            setScore(result.score);
            console.log(`${result.entryCount} entries fetched`);
          },
          () => {
            //onFail
            console.log("Fetch failed");
          }
        )
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const uploadEntry = (submitting: Entry, onComplete: () => void) => {
    setLoading(true);
    if (session) {
      console.log("Session detected, inserting entry");
      insertEntry(session, submitting).finally(() =>
        getEntries().finally(() => onComplete())
      );
    } else {
      console.log("Session not detected, insert failed");
    }
  };
  const removeEntry = (id: number, image: string, onComplete: () => void) => {
    setLoading(true);
    if (session) {
      console.log("Session detected, deleting entry");
      deleteEntry(session, id, image).finally(() =>
        getEntries().finally(() => onComplete())
      );
    } else {
      console.log("Session not detected, delete failed");
    }
  };
  return (
    <EntryDataContext.Provider
      value={{
        data,
        entryCount,
        speciesCount,
        score,
        loading,
        getEntries,
        uploadEntry,
        removeEntry,
      }}
    >
      {children}
    </EntryDataContext.Provider>
  );
}

/**
 * @description (tabs)-wide context for managing entry data
 * @param data the entry data as Entry[]
 * @param entryCount the number of entries fetched
 * @param speciesCount the number of unique entry species
 * @param score the total score of entries
 * @param loading the boolean of loading state. true when fetching data, false otherwise
 * @param getData a function which initiates a data fetch from supabase
 * @example const { data, count, loading, getData } = useEntryDataContext();
 */
export const useEntryDataContext = () => useContext(EntryDataContext);
