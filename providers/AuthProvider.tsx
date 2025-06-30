import signIn from "@/supabase/auth_hooks/signIn";
import signOut from "@/supabase/auth_hooks/signOut";
import signUp from "@/supabase/auth_hooks/signUp";
import supabase from "@/supabase/main";
import fetchUserdata from "@/supabase/social_hooks/fetchUserdata";
import updateUserdata from "@/supabase/social_hooks/updateUserData";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthData = {
  session: Session | null;
  loading: boolean;
  isNewUser: boolean;
  username: string;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  signUpWithEmail: (email: string, password: string) => void;
  setIsNewUser: (flag: boolean) => void;
  fetchUsername: () => void;
  updateUsername: (newName: string) => void;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  isNewUser: false,
  username: "",
  logIn: () => {},
  logOut: () => {},
  signUpWithEmail: () => {},
  setIsNewUser: () => {},
  fetchUsername: () => {},
  updateUsername: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const fetchSession = async () => {
    //get session data from supabase, set loading to false once session received.
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    setLoading(false);
  };

  const fetchUsername = async () => {
    setLoading(true);
    if (session) {
      console.log("Fetching username...");
      const user = await fetchUserdata(session.user.id);
      setUsername(user.username);
    }
    setLoading(false);
  };

  const updateUsername = async (newName: string) => {
    const trimmed = newName.trim();
    setLoading(true);
    if (session) {
      console.log("Updating username...");
      await updateUserdata(session.user.id, trimmed).finally(() =>
        fetchUsername()
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    //fetch the user session for when login/signup
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  //used to fetch userdata on session start/change
  useEffect(() => {
    fetchUsername();
  }, [session]);

  const logIn = (email: string, password: string) => {
    setLoading(true);
    signIn(email, password).finally(() => setLoading(false));
  };

  const logOut = () => {
    setLoading(true);
    signOut().finally(() => setLoading(false));
  };

  const signUpWithEmail = (email: string, password: string) => {
    setLoading(true);
    signUp(email, password).finally(() => setLoading(false));
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        isNewUser,
        username,
        logIn,
        logOut,
        signUpWithEmail,
        setIsNewUser,
        fetchUsername,
        updateUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * @description (auth)-wide context for managing authentication sessions
 * @param session the user session as Session | null
 * @param loading the boolean of loading state. True when doing authentication. else False
 * @param logIn a function which initiates a log in request with supabase auth
 * @param logOut a function which initiates a log out request with supabase auth
 * @param signUpWithEmail a function which initiates a sign up request with supabase auth
 * @example const { session, loading, logIn } = useAuthContext();
 */
export const useAuthContext = () => useContext(AuthContext);
