import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert, } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import useNavigationUtils from '../../../navigation/navigationUtils';
import { useTransactionUtils } from '../../../context/TransactionsContext';
import { supabase } from '../../../services/supabase/init';
import { useAuth } from '../../../services/supabase/auth/useAuth';
import {useAuthFirebase} from '../../../services/firebase/useAuth';
import { getUserProfileByUserIdField } from '../../../services/firebase/databases/profileCollection';
import { signOut } from '../../../services/firebase/viaEmailAndPass/signOut';
// import InputForm from '../components/dashboard/inputForm';
function HomeScreen() {
  const [profile,setProfile] = useState();
      const {transactionsData,setTransactionsData,loading} =useTransactionUtils();    
    const screenWidth = Dimensions.get("screen").width;
    const {user,setUser,setSession} = useAuth();
   const {firebaseUser,setFirebaseUser} =useAuthFirebase();
    const {navigateAndKeepTheRoutes} = useNavigationUtils();
    
    useEffect(()=>{
     
      const fetchProfile = async () => {
        console.log(firebaseUser)
        const profileData = await getUserProfileByUserIdField(firebaseUser.uid);

        console.log("profile data",profileData)
        setProfile(profileData)
      };
      if(firebaseUser){
        console.log("pass and fethcing profile")
        fetchProfile(); 
      }else{
        Alert.alert('login first')
      }
    },[])
    useEffect(()=>{
      console.log("user data",user)
    },[firebaseUser])
    
  return (
    <View style={styles.container}>
    {!profile ? <TouchableOpacity onPress={()=>navigateAndKeepTheRoutes("login")} style={[{
      borderWidth:2,
      width:50,
      height:30,
      borderRadius:20,
      marginRight:2,}]}>
     <Text>
     login
     </Text> 
    </TouchableOpacity>
    :
    <View style={[{
      flexDirection:"row",
      alignItems:"center",
    }]}>
      <TouchableOpacity style={[{
        backgroundColor:"black",
        width:40,
        height:40,
        borderRadius:20,
        marginRight:2,
        
      }]}
      onPress={async()=>{await signOut
  
        setSession(null);  
        setUser(null);
        setTransactionsData([])

      }}
      ></TouchableOpacity>
      <View>
       
        <Text style={[{
          
        }]}>
            username
        </Text>
        {transactionsData.amount ? 
        <Text style={[{
          fontSize:20,
          fontWeight:"bold",
        }]}>
          {transactionsData.amount} $    
        </Text> :
         <Text style={[{
          fontSize:17,
          fontWeight:"bold",
        }]}>
          0.00$
        </Text>
        }
      </View>
    </View>
    }
      
      {/* view report button */}
      <TouchableOpacity 
              style={tw`bg-blue-600 py-3 px-4 rounded-lg`}
              onPress={()=>(navigateAndKeepTheRoutes("expensesReport"))}
            >
              <Text style={tw`text-white text-center font-medium`}>View report</Text>
            </TouchableOpacity>
      {loading ? <View>
        <Text>loading ....................</Text>
      </View>
      :  
      transactionsData.map((item, index) => {
        // Convert the date to string first
        const dateString = new Date(item.transaction_date).toLocaleDateString();
        
        // Determine styling based on transaction type
        const isExpense = item.transaction_type === "expense";
        const amountColor = isExpense ? "red" : "green";
        const iconName = isExpense ? "arrow-down" : "arrow-up"; // Assuming you have these icons available
        
        return (
          <View key={index} style={[tw`w-full rounded-lg border flex flex-row items-center justify-between p-5`, {height: 60}]}>
            <View style={tw`flex flex-row`}>
              <Icon name={item.category_imgID} size={40}/>
              <View style={tw`ml-2`}>
                {/* name category */}
                <Text>{item.category_name}</Text>
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
   