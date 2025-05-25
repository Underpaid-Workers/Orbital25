import data from "@/app/testData/data";
import { createContext, useContext } from "react";

const EntryCountContext = createContext(data.length);
const useEntryCountContext = () => useContext(EntryCountContext);

export default useEntryCountContext;
