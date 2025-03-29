import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import useNavigationUtils from '../../../navigation/navigationUtils';
import { useTransactionUtils } from '../../../context/TransactionsContext';

// import InputForm from '../components/dashboard/inputForm';
function HomeScreen() {
      const {transactionsData} =useTransactionUtils();  
     
     
      
      // Rest of your code
  
    const screenWidth = Dimensions.get("screen").width;
    const {navigateAndKeepTheRoutes} = useNavigationUtils();
  return (
    <View style={styles.container}>
      <TouchableOpacity 
              style={tw`bg-blue-600 py-3 px-4 rounded-lg`}
              
            >
              <Text style={tw`text-white text-center font-medium`}>View report</Text>
            </TouchableOpacity>
      {
       transactionsData.map((item, index) => {
        // Convert the date to string first
        const dateString = new Date(item.date).toLocaleDateString();
        
        // Determine styling based on transaction type
        const isExpense = item.type === "expense";
        const amountColor = isExpense ? "red" : "green";
        const iconName = isExpense ? "arrow-down" : "arrow-up"; // Assuming you have these icons available
        
        return (
          <View key={index} style={[tw`w-full rounded-lg border flex flex-row items-center justify-between p-5`, {height: 60}]}>
            <View style={tw`flex flex-row`}>
              <Icon name={item.category.imgID} size={40}/>
              <View style={tw`ml-2`}>
                {/* name category */}
                <Text>{item.category.name}</Text>
                {/* date */}
                <Text style={tw`text-gray-500`}>{dateString}</Text>
              </View>
            </View>
            {/* amount */}
            <View style={tw`flex flex-row items-center`}>
              <Text style={[{fontSize: 17, color: amountColor}]}>
                {isExpense ? "-" : "+"}{item.amount}$
              </Text>
              <Icon name={iconName} size={20} color={amountColor} style={tw`ml-1`} />
            </View>
          </View>
        );
      })
      }
      
    
    {/* Bottom Bar */}
    <View style={[styles.bottomBar, { width: screenWidth }]}>
      <TouchableOpacity 
        style={styles.roundButton}
        onPress={() => navigateAndKeepTheRoutes("addTransaction")}
      >
        <Icon name="plus" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
   

    
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
     paddingHorizontal:30,
     paddingVertical:50,
    },
    bottomBar: {
      height: 50,
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    roundButton: {
      width: 50,
      height: 50,
      backgroundColor: 'black',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20
    },
  });

export default HomeScreen
   