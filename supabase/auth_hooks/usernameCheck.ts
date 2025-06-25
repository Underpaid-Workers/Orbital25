import supabase from "@/supabase/main";
import { useEffect, useState } from "react";

type SaveResult = {
  success: boolean;
  error?: string;
};

export const useUsernameCheck = () => {
  const [needsUsername, setNeedsUsername] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkDisplayName = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;

      setUserId(user.id);

      const { data, error } = await supabase
        .from("users")
        .select("displayname")
        .eq("id", user.id)
        .single();

      if (!data?.displayname || data.displayname.trim() === "") {
        setNeedsUsername(true);
      }
    };

    checkDisplayName();
  }, []);

  const validateDisplayName = async (newName: string): Promise<SaveResult> => {
    const trimmed = newName.trim();

    if (!trimmed) return { success: false, error: "Username cannot be empty" }; //check if no user input
    if (/\s/.test(trimmed)) return { success: false, error: "Username cannot contain spaces" }; //check if username has spaces
    if (trimmed.length > 20) return { success: false, error: "Username too long" }; //second round check to prevent exceeding char limit

    const { data: existing, error: fetchError } = await supabase
      .from("users")
      .select("id")
      .eq("displayname", trimmed);

    if (fetchError) {
      return { success: false, error: fetchError.message };
    }

    if (existing && existing.length > 0) {
      return { success: false, error: "Username already taken" }; //check if username is already in use
    }

    return { success: true };
  };

  const saveDisplayName = async (newName: string): Promise<SaveResult> => {
    const trimmed = newName.trim();

    if (!userId) return { success: false, error: "User not loaded yet" };

    const { error: updateError } = await supabase
      .from("users")
      .update({ displayname: trimmed })
      .eq("id", userId);

    if (updateError) return { success: false, error: updateError.message };

    setNeedsUsername(false);
    return { success: true };
  };

  return {
    needsUsername,
    validateDisplayName,
    saveDisplayName,
  };
};

