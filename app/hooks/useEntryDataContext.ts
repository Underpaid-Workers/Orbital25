import { createContext, useContext } from "react";
import data from "../testData/data";

//TODO : temp context hook used for testData retrieval across the app.
//usage is const data = useEntryDataContext()
const EntryDataContext = createContext(data);

const useEntryDataContext = () => useContext(EntryDataContext);

export default useEntryDataContext;
