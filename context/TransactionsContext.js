import { useContext,createContext, useState,useEffect } from "react";
import {supabase} from "../services/supabase/init";
import { useAuth } from "../services/supabase/auth/useAuth";
const TransactionContext = createContext();

export function TransactionContextProvider({children}){
   const {loading,setLoading} = useState(true);
    const [transactionsData,setTransactionData] = useState(
        []        
    );
    const {user} = useAuth();
    
    useEffect(()=>{
        console.log(user)
        if(user){
            supabase.from('transactions').select('*').eq('user_id',user.id).then(({data,error})=>{
                if(error) console.log("error fetching transactions data",error)
                else{
                    console.log("transactions data",data[0])
                    setTransactionData(data)
                }
                setLoading(false)
            })
        }
        
    },[user])
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