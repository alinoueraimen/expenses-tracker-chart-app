import { db } from "../firebaseInit"
import { collection,addDoc,serverTimestamp,doc,getDocs,query,where } from "firebase/firestore"

export async function addProfileDocIntoCollection(
    userId,username,email
  ) {
    try {
        const collectionRef = collection(db, "profiles")
        const docRef = await addDoc(collectionRef,{
            userId,
            username,
            email,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
        })    
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("error in addProfileDocIntoCollection",error.message)
    }
  }   

  export async function getUserProfileByUserIdField(userId) {
    try {
        console.log(userId)
      const q = query(
        collection(db, "profiles"),
        where("userId", "==", userId) // Mencari berdasarkan field userId
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Mengambil dokumen pertama yang cocok
        const doc = querySnapshot.docs[0];
        console.log("Document data:", doc.data());
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error("Error querying profile:", error);
      throw error;
    }
  }