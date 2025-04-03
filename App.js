import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";
import ContextProviderWrapper from "./utils/ContextProviderWrapper";
import { useEffect } from "react";

export default function App() {
  useEffect(()=>{
    console.log("app component");
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

