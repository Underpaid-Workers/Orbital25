import { useAuthContext } from "@/providers/AuthProvider";
import fetchEntries from "@/supabase/db_hooks/fetchEntries";
import FetchEntry from "@/supabase/entrySchema";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type EntryData = {
  data: FetchEntry[];
  count: number;
  loading: boolean;
  getData: () => void;
};

const EntryDataContext = createContext<EntryData>({
  data: [],
  count: 0,
  loading: false,
  getData: () => {},
});

export default function EntryDataProvider({ children }: PropsWithChildren) {
  const { session } = useAuthContext();
  const [data, setData] = useState<FetchEntry[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const onBegin = () => {
    setLoading(true);
  };

  const onComplete = () => {
    setLoading(false);
  };

  const getData = async () => {
    if (session) {
      console.log("Fetching data...");
      fetchEntries(session, onBegin, onComplete).then(
        (result) => {
          //onSuccess
          setData(result.data);
          setCount(result.count);
          console.log("Data fetched");
        },
        () => {
          //onFail
          console.log("Fetch failed");
        }
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <EntryDataContext.Provider value={{ data, count, loading, getData }}>
      {children}
    </EntryDataContext.Provider>
  );
}

/**
 * @description (tabs)-wide context for managing entry data
 * @param data the entry data as FetchEntry[]
 * @param count the number of entries fetched
 * @param loading the boolean of loading state. true when fetching data, false otherwise
 * @param getData a function which initiates a data fetch from supabase
 * @example const { data, count, loading, getData } = useEntryDataContext();
 */
export const useEntryDataContext = () => useContext(EntryDataContext);
