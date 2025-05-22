import { createContext, useContext } from "react";
import data from "../testData/data";

const EntryCountContext = createContext(data.length);
const useEntryCountContext = () => useContext(EntryCountContext);

export default useEntryCountContext;
