import { auth } from "../firebaseInit";
import {signInWithEmailAndPassword} from "firebase/auth";
import { Alert } from "react-native";

async function signIn (credentials) {
    const {email,password} = credentials
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user; // Return the auth data for further processing
    } catch (error) {
        console.error("login failed :", error.message);
        if(error.code === "auth/wrong-password"){
            Alert.alert("Email atau Password salah")
        }else{
            throw error;
        }
    }
}
export default signIn