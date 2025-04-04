import { TransactionContextProvider } from "../context/TransactionsContext";
import { AuthProvider } from "../services/supabase/auth/useAuth";
import { AuthFirebaseProvider } from "../services/firebase/useAuth";
function ContextProviderWrapper({children}){
    return(
        <AuthFirebaseProvider>
            <AuthProvider>
            <TransactionContextProvider>
            {children}
            </TransactionContextProvider>
          </AuthProvider>
        </AuthFirebaseProvider>
        
        
    )
}
export default ContextProviderWrapper