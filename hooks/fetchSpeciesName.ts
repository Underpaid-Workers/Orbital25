import Constants from "expo-constants";

export default async function fetchSpeciesName(base64Image: string) {
  let hfToken: any = null;
  let hfModelUrl: any = null;

  if (Constants.expoConfig && Constants.expoConfig.extra) {
    hfToken = Constants.expoConfig.extra.hfToken as string;
    hfModelUrl = Constants.expoConfig.extra.hfModelUrl as string;
  } else {
    console.error(
      "Expo config (Constants.expoConfig.extra) is missing. Cannot load API keys."
    );
  }

  const response = await fetch(hfModelUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${hfToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: base64Image }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${errorText}`);
  }
  const data = await response.json();
  const prediction = data?.[0];
  if (prediction?.label) {
    const speciesName = prediction.label.split(",")[0].trim() as string;
    const speciesNameUppercased = speciesName
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ");
    return speciesNameUppercased;
  } else {
    return "Nothing";
  }
}
