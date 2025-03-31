import 'react-native-gesture-handler'
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//screens
 

// stack
const Stack = createStackNavigator();

function AppNavigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
             
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator