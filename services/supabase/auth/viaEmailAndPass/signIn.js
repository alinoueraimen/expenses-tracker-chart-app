import {supabase} from "../../init";
async function signIn(credentials){
    const {email,password} = credentials
    try {
        const {error,data} = await supabase.auth.signInWithPassword({
            email ,
            password,
        })
        if(error) {
            if(error.message.includes("invalid login credentials")){
                Alert.alert("Email atau Password salah") 
            }else{
                throw error
            }
        }
            return data    
    } catch (error) {
        console.error("login failed :", error.message);
        throw error;
    }    
}
export default signIn