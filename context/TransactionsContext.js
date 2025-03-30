import { useContext,createContext, useState,useEffect } from "react";
const TransactionContext = createContext();
export function TransactionContextProvider({children}){
    const [transactionsData,setTransactionData] = useState(
        []        
    );
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