import { auth } from "../firebaseInit";
import {createUserWithEmailAndPassword} from "firebase/auth";
async function signUp(credentials){
   
        const {email,password} = credentials
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return user; // Return the auth data for further processing
        } catch (error) {
            console.error("sign up failed :", error.message);
            if(error.code === "auth/email-already-in-use"){
                Alert.alert("Email sudah terdaftar")
            }else{
                throw error;
            }
        }
    return user;
    
}
export default signUp;