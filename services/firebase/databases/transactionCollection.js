 import { db } from "../firebaseInit"
 import { collection,addDoc,serverTimestamp,getDocs,query,where } from "firebase/firestore"
export async function addTransactionDoc(user_id,amount,transaction_type,category_name,category_imgID,transaction_date,description){  
    
    try {
        console.log("addTransactionDoc : ",user_id,amount,transaction_type,category_name,category_imgID,transaction_date,description)
        const collectionRef = collection(db, "transactions")
        const docRef = await addDoc(collectionRef,{
            user_id,
            amount,
            transaction_type,
            category_name,
            category_imgID,
            transaction_date,
            description,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
        })
        console.log("transaction added by id :",docRef.id)
    } catch (error) {
        console.error("Error adding transaction document: ", error.message)
    }
}
export async function getAllTransactionsByUser(user_id) {
    try {
      // 1. Buat reference ke koleksi transactions
      const transactionsRef = collection(db, "transactions");
      
      // 2. Buat query dengan filter user_id
      const q = query(
        transactionsRef,
        where("user_id", "==", user_id)
      );
  
      // 3. Eksekusi query
      const querySnapshot = await getDocs(q);
      
      // 4. Format data hasil query
      const transactions = querySnapshot.docs.map(doc => ({
        id: doc.id, // Include document ID
        ...doc.data(),
        
       
      }));
  
      return transactions;
  
    } catch (error) {
      console.error("Error getting all transactions:", error);
      throw new Error("Failed to get transactions: " + error.message);
    }
  }