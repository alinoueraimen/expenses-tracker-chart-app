import { supabase } from "../../init";

/**
 * Handle authentication (sign-up/sign-in) with email and password.
 * @param {"signup" | "signin"} action - Type of action.
 * @param {{ email: string, password: string }} credentials - User credentials.
 * @returns {Promise<any>} - Supabase auth response data.
 * @throws {Error} - If parameters are invalid or auth fails.
 */
async function handleAuthViaEmailAndPass(action, credentials) {
  if (!action || !credentials) {
    throw new Error("Invalid parameters: action and credentials are required");
  }

  try {
    if (action === "signup") {
      const { data, error } = await supabase.auth.signUp(credentials);
      if (error) throw error;
      console.log("sign up berhasil dengan data :",{data})
      return data;
    } else if (action === "signin") {
      const { data, error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;

      return data;
    } else {
      throw new Error("Unknown action: must be 'signup' or 'signin'");
    }
  } catch (error) {
    console.error(`Auth error (${action}):`, error);
    throw new Error(`Auth failed: ${error.message}`);
  }
}
export default handleAuthViaEmailAndPass