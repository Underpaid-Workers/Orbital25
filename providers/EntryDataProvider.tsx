import { useAuthContext } from "@/providers/AuthProvider";
import deleteEntry from "@/supabase/db_hooks/deleteEntry";
import fetchEntries from "@/supabase/db_hooks/fetchEntries";
import insertEntry from "@/supabase/db_hooks/insertEntry";
import Entry from "@/supabase/entrySchema";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export type EntryData = {
  data: Entry[];
  count: number;
  loading: boolean;
  getEntries: () => void;
  uploadEntry: (submitting: Entry, onComplete: () => void) => void;
  removeEntry: (id: number, image: string, onComplete: () => void) => void;
};

const EntryDataContext = createContext<EntryData>({
  data: [],
  count: 0,
  loading: false,
  getEntries: () => {},
  uploadEntry: () => {},
  removeEntry: () => {},
});

export default function EntryDataProvider({ children }: PropsWithChildren) {
  const { session } = useAuthContext();
  const [data, setData] = useState<Entry[]>([]);
  const [count, setCount] = useState<number>(0);
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
            setCount(result.count);
            console.log(`${result.count} entries fetched`);
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
        count,
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
 * @param count the number of entries fetched
 * @param loading the boolean of loading state. true when fetching data, false otherwise
 * @param getData a function which initiates a data fetch from supabase
 * @example const { data, count, loading, getData } = useEntryDataContext();
 */
export const useEntryDataContext = () => useContext(EntryDataContext);
