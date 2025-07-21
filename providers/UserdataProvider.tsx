import checkEarnableProgressionBadges from "@/hooks/checkEarnableProgressionBadges";
import sortBadges from "@/hooks/sortBadges";
import validateTrimmedUsername from "@/hooks/validateTrimmedUsername";
import { useAuthContext } from "@/providers/AuthProvider";
import checkUsername from "@/supabase/auth_hooks/checkUsername";
import addBadgesToUser from "@/supabase/progression_hooks/addBadgesToUser";
import fetchAllUserBadges from "@/supabase/progression_hooks/fetchAllUserBadges";
import { Badge, Stats } from "@/supabase/schema";
import fetchUserdata from "@/supabase/social_hooks/fetchUserdata";
import updateUserdata from "@/supabase/social_hooks/updateUserData";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Alert } from "react-native";

const defaultStats: Stats = {
  streakDays: 0,
  rarity: {
    common: 0,
    uncommon: 0,
    rare: 0,
    "very rare": 0,
    unique: 0,
  },
  envType: {
    aquatic: 0,
    terrestrial: 0,
    flying: 0,
  },
  speciesType: {
    animal: 0,
    plant: 0,
  },
  habitat: {
    forest: 0,
    grassland: 0,
    wetland: 0,
    desert: 0,
    mountains: 0,
    coastal: 0,
    oceanic: 0,
    freshwater: 0,
    urban: 0,
    caves: 0,
    tundra: 0,
  },
};

type Userdata = {
  userLoading: boolean;
  username: string;
  entryCount: number;
  speciesCount: number;
  score: number;
  userBadges: Badge[];
  stats: Stats;
  getUserdata: () => void;
  getUserBadges: () => void;
  updateUsername: (
    newName: string,
    onFail: () => void,
    onComplete: () => void
  ) => void;
  updateUserProgressionBadges: (
    onComplete?: (badgeCount: number) => void
  ) => void;
};

const UserdataContext = createContext<Userdata>({
  userLoading: true,
  username: "",
  entryCount: 0,
  speciesCount: 0,
  score: 0,
  userBadges: [],
  stats: defaultStats,
  getUserdata: () => {},
  getUserBadges: () => {},
  updateUsername: () => {},
  updateUserProgressionBadges: () => {},
});

export default function UserdataProvider({ children }: PropsWithChildren) {
  const { session } = useAuthContext();

  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [entryCount, setEntryCount] = useState<number>(0);
  const [speciesCount, setSpeciesCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [userBadges, setUserBadges] = useState<Badge[]>([]);
  const [stats, setStats] = useState<Stats>(defaultStats);

  const getUserdata = () => {
    setUserLoading(true);
    if (session) {
      console.log("Fetching username...");
      fetchUserdata(session.user.id)
        .then((response) => {
          if (response.success) {
            const user = response.data;
            setUsername(user.username);
            setEntryCount(user.entrycount);
            setSpeciesCount(user.speciescount);
            setScore(user.score);
            setStats(user.stats);
          } else {
            console.error(response.message);
            Alert.alert("Fetch Error", response.message);
          }
        })
        .finally(() => setUserLoading(false));
    } else {
      console.error("No session detected");
      setUserLoading(false);
    }
  };

  const getUserBadges = () => {
    setUserLoading(true);
    console.log("Fetching badges...");
    if (session) {
      fetchAllUserBadges(session.user.id)
        .then((response) => {
          if (response.success) {
            console.log(`${response.data.length} badges fetched`);

            let processed = sortBadges(response.data);
            setBadges(response.data);
            processed = processed.filter((badge) => badge.earned_at);
            setUserBadges(processed);
          } else {
            Alert.alert("Fetch Error", response.message);
          }
        })
        .finally(() => {
          setUserLoading(false);
        });
    } else {
      console.error("No session detected");
      setUserLoading(false);
    }
  };

  const updateUserProgressionBadges = (
    onComplete?: (badgeCount: number) => void
  ) => {
    setUserLoading(true);
    getUserdata();
    console.log("Updating progression badges...");
    if (session) {
      const ownedBadges = new Set(userBadges.map((b) => b.code));
      const unownedProgressionBadges = badges.filter(
        (badge) =>
          badge.badge_type === "progression" && !ownedBadges.has(badge.code)
      );
      const earnableBadges = checkEarnableProgressionBadges(
        entryCount,
        speciesCount,
        score,
        stats,
        unownedProgressionBadges
      );
      console.log(`Earnable badges found: ${earnableBadges.length}`);
      addBadgesToUser(session.user.id, earnableBadges)
        .then((response) => {
          if (response.success) {
            console.log(`${earnableBadges.length} badges added.`);

            if (onComplete && earnableBadges.length > 0)
              onComplete(earnableBadges.length);
          } else {
            console.error(response.message);
            Alert.alert("Update Error", response.message);
          }
        })
        .finally(() => {
          setUserLoading(false);
        });
    } else {
      console.error("No session detected");
      setUserLoading(false);
    }
  };

  //TODO: Get other users data??
  // const getSpecificUserdata = (user_id:string) =>{}

  const updateUsername = (
    newName: string,
    onFail: () => void,
    onComplete: () => void
  ) => {
    setUserLoading(true);
    const trimmed = newName.trim();
    console.log("Validating Username...");
    const validation = validateTrimmedUsername(trimmed);
    if (validation.success) {
      checkUsername(trimmed)
        .then((response) => {
          if (response.success) {
            actualUpdate();
            onComplete();
          } else {
            console.error(response.message);
            Alert.alert("Username Error", response.message);
            onFail();
          }
        })
        .finally(() => setUserLoading(false));
    } else {
      Alert.alert("Username Error", validation.error);
      setUserLoading(false);
    }

    const actualUpdate = () => {
      if (session) {
        console.log("Updating username...");
        updateUserdata(session.user.id, trimmed)
          .then((response) => {
            if (response.success) {
              Alert.alert("Success", "Username Updated!");
            } else {
              console.error(response.message);
              Alert.alert("Update Error", response.message);
            }
          })
          .finally(() => {
            getUserdata();
            setUserLoading(false);
          });
      } else {
        console.error("No session detected");
        setUserLoading(false);
      }
    };
  };

  return (
    <UserdataContext.Provider
      value={{
        userLoading,
        username,
        entryCount,
        speciesCount,
        score,
        userBadges,
        stats,
        getUserdata,
        getUserBadges,
        updateUsername,
        updateUserProgressionBadges,
      }}
    >
      {children}
    </UserdataContext.Provider>
  );
}

/**
 * @description (tabs)-wide context for managing user data
 * @param userLoading the boolean of loading state. True when loading user data. Else false.
 * @param username the username of the logged in user as string
 * @param entryCount the number of entries of the logged in user as number
 * @param speciesCount the number of unique entry species of the logged in user as number
 * @param score the score of the logged in user as number
 * @param userBadges the logged in user's owned badges as Badge[]
 * @param stats the stats of the logged in user
 * @param getUserdata a function to fetch the logged in user's user data from supabase
 * @param getUserBadges a function to fetch the logged in user's earned badges from supabase
 * @param updateUsername a function to update the logged in user's username in supabase
 * @param updateUserProgressionBadges a function to update the logged in user's earned badges in supabase
 * @example const { userLoading, username, updateUsername } = useUserdataContext();
 */
export const useUserdataContext = () => useContext(UserdataContext);
