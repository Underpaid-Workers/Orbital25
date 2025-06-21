//temporary placeholder for ML API functionality.
//always returns entry defined below.
export interface APIResult {
  name: string;
  description: string;
  types: string[];
}

export default function APIHook(): APIResult {
  return {
    name: "Mighty Bird",
    description:
      "A bird so mighty that even the Donald Duck would tremble before it.",
    types: ["animal", "flying"],
  };
}
