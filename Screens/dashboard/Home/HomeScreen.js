import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions,Modal } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import useNavigationUtils from '../../../navigation/navigationUtils';
// import InputForm from '../components/dashboard/inputForm';
function HomeScreen() {
    const screenWidth = Dimensions.get("screen").width;
    const {navigateAndKeepTheRoutes} = useNavigationUtils();
  return (
    <View style={styles.container}>
 
    {/* <InputForm/> */}
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
   