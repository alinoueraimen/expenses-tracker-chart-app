import { TransactionContextProvider } from "../context/TransactionsContext";
function ContextProviderWrapper({children}){
    return(
        <TransactionContextProvider>
            {children}
        </TransactionContextProvider>
    )
}
export default ContextProviderWrapper