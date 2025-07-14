import { useAuthContext } from "@/providers/AuthProvider";
import deleteEntry from "@/supabase/db_hooks/deleteEntry";
import fetchEntries from "@/supabase/db_hooks/fetchEntries";
import insertEntry from "@/supabase/db_hooks/insertEntry";
import updateEntry from "@/supabase/db_hooks/updateEntry";
import EntryLocal from "@/supabase/schema";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Alert } from "react-native";

export type EntryData = {
  data: EntryLocal[];
  loading: boolean;
  getEntries: () => void;
  uploadEntry: (submitting: EntryLocal, onComplete: () => void) => void;
  updateEntryObservation: (
    id: number,
    observation: string,
    onComplete: () => void
  ) => void;
  removeEntry: (id: number, image: string, onComplete: () => void) => void;
};

const EntryDataContext = createContext<EntryData>({
  data: [],
  loading: false,
  getEntries: () => {},
  uploadEntry: () => {},
  updateEntryObservation: () => {},
  removeEntry: () => {},
});

export default function EntryDataProvider({ children }: PropsWithChildren) {
  const { session } = useAuthContext();
  const [data, setData] = useState<EntryLocal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getEntries = () => {
    setLoading(true);
    if (session) {
      console.log("Fetching data...");
      fetchEntries(session)
        .then((response) => {
          if (response.success) {
            setData(response.data);
            console.log(`${response.data.length} entries fetched`);
          } else {
            console.error(response.message);
            Alert.alert("Fetch Error", response.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const uploadEntry = (submitting: EntryLocal, onComplete: () => void) => {
    setLoading(true);
    if (session) {
      console.log("Session detected, inserting entry");
      insertEntry(session, submitting)
        .then((response) => {
          if (response.success) {
            //nothing
          } else {
            console.error(response.message);
            Alert.alert("Insert Error", response.message);
          }
        })
        .finally(() => {
          getEntries();
          onComplete();
          setLoading(false);
        });
    } else {
      console.log("Session not detected, insert failed");
    }
  };

  const removeEntry = (id: number, image: string, onComplete: () => void) => {
    setLoading(true);
    if (session) {
      console.log("Session detected, deleting entry");
      deleteEntry(session, id, image)
        .then((response) => {
          if (response.success) {
            Alert.alert("Success", "Entry deleted and entry IDs updated.");
          } else {
            console.error(response.message);
            Alert.alert("Delete Error", response.message);
          }
        })
        .finally(() => {
          getEntries();
          onComplete();
          setLoading(false);
        });
    } else {
      console.log("Session not detected, delete failed");
    }
  };

  const updateEntryObservation = (
    id: number,
    observation: string,
    onComplete: () => void
  ) => {
    setLoading(true);
    if (session) {
      console.log("Session detected, updating entry");
      updateEntry(session, id, observation).finally(() => {
        getEntries();
        onComplete();
      });
    }
  };

  return (
    <EntryDataContext.Provider
      value={{
        data,
        loading,
        getEntries,
        uploadEntry,
        updateEntryObservation,
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
 * @param loading the boolean of loading state. true when fetching data, false otherwise
 * @param getEntries a function which fetches user's entries from supabase
 * @param uploadEntry a function which uploads a user's new entry to supabase
 * @param updateEntryObservation a function which updates a user entry's observation in supabase
 * @param removeEntry a function which deletes a user's existing entry from supabase
 * @example const { data, loading, getEntries } = useEntryDataContext();
 */
export const useEntryDataContext = () => useContext(EntryDataContext);
