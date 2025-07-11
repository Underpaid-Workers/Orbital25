import sortBadges from "@/hooks/sortBadges";
import validateTrimmedUsername from "@/hooks/validateTrimmedUsername";
import { useAuthContext } from "@/providers/AuthProvider";
import checkUsername from "@/supabase/auth_hooks/checkUsername";
import fetchAllUserBadges from "@/supabase/progression_hooks/fetchAllUserBadges";
import { Badge, User } from "@/supabase/schema";
import fetchUserdata from "@/supabase/social_hooks/fetchUserdata";
import updateUserdata from "@/supabase/social_hooks/updateUserData";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

type Userdata = {
  userLoading: boolean;
  username: string;
  entryCount: number;
  speciesCount: number;
  score: number;
  badges: Badge[];
  getUserdata: () => void;
  getUserBadges: () => void;
  updateUsername: (
    newName: string,
    onFail: () => void,
    onComplete: () => void
  ) => void;
};

const UserdataContext = createContext<Userdata>({
  userLoading: true,
  username: "",
  entryCount: 0,
  speciesCount: 0,
  score: 0,
  badges: [],
  getUserdata: () => {},
  getUserBadges: () => {},
  updateUsername: () => {},
});

export default function UserdataProvider({ children }: PropsWithChildren) {
  const { session } = useAuthContext();

  const defaultStats: User["stats"] = {
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
  };

  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [entryCount, setEntryCount] = useState<number>(0);
  const [speciesCount, setSpeciesCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [stats, setStats] = useState<User["stats"]>(defaultStats);

  useEffect(() => {
    getUserdata();
  }, [session]);

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
            setBadges(sortBadges(response.data));
          } else {
            Alert.alert("Fetch Error", response.message);
          }
        })
        .finally(() => setUserLoading(false));
    } else {
      console.error("No session detected");
      setUserLoading(false);
    }
  };

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
        badges,
        getUserdata,
        getUserBadges,
        updateUsername,
        // updateUserBadges,
      }}
    >
      {children}
    </UserdataContext.Provider>
  );
}

export const useUserdataContext = () => useContext(UserdataContext);
