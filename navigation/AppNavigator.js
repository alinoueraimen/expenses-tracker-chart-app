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

import LoginScreen from "../Screens/auth/LoginScreen";
import RegisterScreen from "../Screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../Screens/auth/ForgotPasswordScreen";
import EmailVerificationScreen from "../Screens/auth/EmailVerificationScreen";

import TestingScreen from '../Screens/TestingScreen';
// stack
const Stack = createStackNavigator();

function AppNavigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="register">
                {/* dashboard */}
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

                 {/* auth */}
                 <Stack.Screen name="login"
                component={LoginScreen}
                options={{headerShown:false}}
                />
                 <Stack.Screen name="register"
                component={RegisterScreen}
                options={{headerShown:false}}
                />
                 <Stack.Screen name="forgotPassword"
                component={ForgotPasswordScreen}
                options={{headerShown:false}}
                />
                 <Stack.Screen name="verifyEmail"
                component={EmailVerificationScreen}
                options={{headerShown:false}}
                />


                {/* test */}
                <Stack.Screen name="test"
                component={TestingScreen}
                options={{headerShown:false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator