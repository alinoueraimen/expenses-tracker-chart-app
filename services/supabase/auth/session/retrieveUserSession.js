import { supabase } from "../../init";

async function handleRetrieveUserSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      throw new Error(`Failed to retrieve session: ${error.message}`);
    }
    
    return session; // Mengembalikan session untuk digunakan di tempat lain
  } catch (error) {
    console.error("Error in handleRetrieveUserSession:", error.message);
    return null;
  }
}

export default handleRetrieveUserSession;