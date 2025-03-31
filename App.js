import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";
import ContextProviderWrapper from "./utils/ContextProviderWrapper";
import { useEffect } from "react";
import Constant from 'expo-constants'
import useAuth from "./services/supabase/auth/useAuth";
export default function App() {
  const {handleAuthListener,handleRetrieveUserSession}  = useAuth();
  const authInitialize = async () => {
    console.log("initializing auth")
    const session = await handleRetrieveUserSession();
    console.log(session);
    return session
  }
  const {dev} =Constant.expoConfig.extra;
useEffect(()=>{
  console.log(`we are in ${dev} mode`)
  authInitialize().then((result)=>{
    console.log("auth initialize :",result);
  })
})
  return (
  <>
       <StatusBar style="auto" />
       <ContextProviderWrapper>
         <AppNavigator/>
       </ContextProviderWrapper>
  </>
  );
}

