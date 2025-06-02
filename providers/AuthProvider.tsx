import signIn from "@/supabase/auth_hooks/signIn";
import signOut from "@/supabase/auth_hooks/signOut";
import signUp from "@/supabase/auth_hooks/signUp";
import supabase from "@/supabase/main";
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
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  signUpWithEmail: (email: string, password: string) => void;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  logIn: () => {},
  logOut: () => {},
  signUpWithEmail: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      //get session data from supabase, set loading to false once session received.
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    //fetch the user session for when login/signup
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
      value={{ session, loading, logIn, logOut, signUpWithEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
