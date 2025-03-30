import { supabase } from "../../init";
async function handleSignout () {
    try {
        const {error} = await supabase.auth.signOut();    
        if (error){
            console.log("error while signing out",error);
        }
    } catch (error) {
        console.error("there's error on handleSignout");

    }
    
}
export default handleSignout