import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";
import ContextProviderWrapper from "./utils/ContextProviderWrapper";
import { useEffect } from "react";
import Constant from 'expo-constants'
export default function App() {
  const {dev} =Constant.expoConfig.extra
useEffect(()=>{
  console.log(`we are in ${dev} mode`)
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

