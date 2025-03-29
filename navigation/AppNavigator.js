import 'react-native-gesture-handler'
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//screens
 
import AddTransactionScreen from "../Screens/dashboard/addTransaction/AddTransactionScreen";
import SelectCategoryScreen from '../Screens/dashboard/addTransaction/selectCategory/SelectCategoryScreen';
import SelectAmountScreen from '../Screens/dashboard/addTransaction/selectAmount/selectAmountScreen';

import HomeScreen from "../Screens/dashboard/Home/HomeScreen";

import ExpensesReport from '../Screens/dashboard/expensesReport/ExpensesReportScreen';
import TestingScreen from '../Screens/TestingScreen';
// stack
const Stack = createStackNavigator();

function AppNavigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
                <Stack.Screen name="addTransaction"
                component={AddTransactionScreen}
                options={{headerShown:false}}
                />
                <Stack.Screen name="selectCategory"
                component={SelectCategoryScreen}
                options={{headerShown:false}}
                />
                <Stack.Screen name="selectAmount"
                component={SelectAmountScreen}
                options={{headerShown:false}}
                />


                <Stack.Screen name="home"
                component={HomeScreen}
                options={{headerShown:false}}
                />

                <Stack.Screen name="expensesReport"
                component={ExpensesReport}
                options={{headerShown:false}}
                />



                <Stack.Screen name="test"
                component={TestingScreen}
                options={{headerShown:false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator