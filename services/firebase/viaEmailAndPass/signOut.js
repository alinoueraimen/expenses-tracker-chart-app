import { auth } from "../firebaseInit";
import { signOut } from "firebase/auth";
export async function signOut(){
    try {
        await signOut(auth);
        console.log("User signed out successfully.");
        return true;
    } catch (error) {
        console.error("Error signing out: ", error);
        return false;
    }
}