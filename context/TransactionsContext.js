import { useContext,createContext, useState } from "react";
const TransactionContext = createContext();
export function TransactionContextProvider({children}){
    const [transactionsData,setTransactionData] = useState(
        
    );
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