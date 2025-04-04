import {supabase} from "../../init";
async function signUp(credentials){
    const {email,password,username} = credentials
    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username,
                is_admin: email === "alinuriman.dev@gmail.com",
              }
            }
          });
          if (authError) throw authError;
        return authData; // Return the auth data for further processing
    } catch (error) {
        console.error("register failed :", error.message);
        throw error;        
    }
    
}
export default signUp
