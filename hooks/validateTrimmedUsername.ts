type SaveResult = {
  success: boolean;
  error?: string;
};

export default function validateTrimmedUsername(trimmed: string): SaveResult {
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
