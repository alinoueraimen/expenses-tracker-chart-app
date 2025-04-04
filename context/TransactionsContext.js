import { useContext,createContext, useState,useEffect } from "react";
import {supabase} from "../services/supabase/init";
import { useAuth } from "../services/supabase/auth/useAuth";
import {useAuthFirebase} from "../services/firebase/useAuth";
import { getAllTransactionsByUser } from "../services/firebase/databases/transactionCollection";
const TransactionContext = createContext();

export function TransactionContextProvider({children}){
   const {loading,setLoading} = useState(true);
    const [transactionsData,setTransactionData] = useState(
        []        
    );
    const {user} = useAuth();
    const {firebaseUser} = useAuthFirebase();
    
    useEffect(()=>{
        console.log(firebaseUser)
        if(firebaseUser){
           getAllTransactionsByUser(firebaseUser.uid).then((res)=>{
                console.log("transaction data",res)
                setTransactionData(res)
            })
        }
        
    },[firebaseUser])
    useEffect(()=>{

        console.log("overall transaction datas :",transactionsData)
    },[transactionsData])
    return(
        <>
            <TransactionContext.Provider value={{transactionsData,setTransactionData}}>
                {children}
            </TransactionContext.Provider>
        </>
    )
}
export function useTransactionUtils(){
   return useContext(TransactionContext);
}