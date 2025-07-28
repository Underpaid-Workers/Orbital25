type Result = {
  success: boolean;
  error?: string;
};

/**
 * @description A function that takes in a string and checks that it is not empty, not contain spaces, and not more than 20 characters
 * @param trimmed as string
 * @returns check result as Result
 */
export default function validateTrimmedUsername(trimmed: string): Result {
  if (!trimmed) {
    return { success: false, error: "Username cannot be empty" };
  } //check if no user input
  else if (/\s/.test(trimmed)) {
    return { success: false, error: "Username cannot contain spaces" };
  } //check if username has spaces
  else if (trimmed.length > 20) {
    return { success: false, error: "Username too long" }; //second round check to prevent exceeding char limit
  } else {
    return { success: true };
  }
}
