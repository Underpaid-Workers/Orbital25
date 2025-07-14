import checkEmailExists from "@/supabase/auth_hooks/checkEmail";
import deleteAccount from "@/supabase/auth_hooks/deleteAccount";
import signIn from "@/supabase/auth_hooks/signIn";
import signOut from "@/supabase/auth_hooks/signOut";
import signUp from "@/supabase/auth_hooks/signUp";
import deleteEntryImages from "@/supabase/db_hooks/deleteEntryImages";
import fetchEntryImages from "@/supabase/db_hooks/fetchEntryImages";
import supabase from "@/supabase/main";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

type AuthData = {
  session: Session | null;
  loading: boolean;
  isNewUser: boolean;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  signUpWithEmail: (email: string, password: string) => void;
  setIsNewUser: (flag: boolean) => void;
  removeAccount: () => void;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  isNewUser: false,
  logIn: () => {},
  logOut: () => {},
  signUpWithEmail: () => {},
  setIsNewUser: () => {},
  removeAccount: () => {},
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

  useEffect(() => {
    //fetch the user session for when login/signup
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const logIn = (email: string, password: string) => {
    setLoading(true);
    signIn(email, password)
      .then((response) => {
        if (!response.success) {
          Alert.alert(response.message as string);
        }
      })
      .finally(() => setLoading(false));
  };

  const logOut = () => {
    setLoading(true);
    signOut()
      .then((response) => {
        if (!response.success) {
          Alert.alert(response.message as string);
        }
      })
      .finally(() => setLoading(false));
  };

  const signUpWithEmail = (email: string, password: string) => {
    setLoading(true);
    checkEmailExists(email)
      .then((checkEmailResponse) => {
        if (checkEmailResponse.success) {
          if (checkEmailResponse.data === false) {
            signUp(email, password).then((SignUpResponse) => {
              if (SignUpResponse.success) {
                Alert.alert("Sign Up Successful!");
              } else {
                Alert.alert(SignUpResponse.message as string);
              }
            });
          } else {
            Alert.alert("Email has a registered user!");
          }
        } else {
          Alert.alert(checkEmailResponse.message as string);
        }
      })
      .finally(() => setLoading(false));
  };

  const removeAccount = () => {
    //TODO: Create a custom modal for deletion
    Alert.alert(
      "Confirm Delete?",
      "This action CANNOT be reversed! Are you absolutely sure?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            let user_id = session?.user.id as string;
            fetchEntryImages(user_id).then((response) => {
              if (response.success) {
                deleteEntryImages(response.data).then((response) => {
                  if (response.success) {
                    deleteAccount(user_id).then((response) => {
                      if (response.success) {
                        Alert.alert("Account deleted.");
                        signOut();
                      } else {
                        Alert.alert(response.message as string);
                      }
                    });
                  } else {
                    Alert.alert(response.message as string);
                  }
                });
              } else {
                Alert.alert(response.message as string);
              }
            });
          },
        },
      ]
    );
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        isNewUser,
        logIn,
        logOut,
        signUpWithEmail,
        setIsNewUser,
        removeAccount,
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
 * @param isNewUser the boolean of new user flag. True when user signs up for the first time, else false
 * @param logIn a function which initiates a log in request with supabase auth
 * @param logOut a function which initiates a log out request with supabase auth
 * @param signUpWithEmail a function which initiates a sign up request with supabase auth
 * @param setIsNewUser a function which sets the flag representing a new user, true or false
 * @param removeAccount a function which initiates a delete account request on supabase
 * @example const { session, loading, logIn } = useAuthContext();
 */
export const useAuthContext = () => useContext(AuthContext);
