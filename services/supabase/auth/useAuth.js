import handleAuthListener from "./authListener/authListener";
import handleSignout from "./signout/signout";
import handleRetrieveUserSession from "./session/retrieveUserSession";
import handleAuthViaEmailAndPass from "./viaEmailAndPass/authViaEmailAndPass";
// Oauth coming soon
function useAuth (){
    return {handleAuthListener,handleSignout,handleRetrieveUserSession,handleAuthViaEmailAndPass}
}
export default useAuth