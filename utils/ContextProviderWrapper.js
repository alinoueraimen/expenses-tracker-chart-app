import { TransactionContextProvider } from "../context/TransactionsContext";
import { AuthProvider } from "../services/supabase/auth/useAuth";
function ContextProviderWrapper({children}){
    return(
        <AuthProvider>
            <TransactionContextProvider>
            {children}
            </TransactionContextProvider>
        </AuthProvider>
        
    )
}
export default ContextProviderWrapper