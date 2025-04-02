import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";
import ContextProviderWrapper from "./utils/ContextProviderWrapper";

export default function App() {
  
  return (
  <>
       <StatusBar style="auto" />
       <ContextProviderWrapper>
         <AppNavigator/>
       </ContextProviderWrapper>
  </>
  );
}

