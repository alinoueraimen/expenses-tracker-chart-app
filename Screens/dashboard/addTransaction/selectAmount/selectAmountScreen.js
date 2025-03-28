import React, { useEffect, useState } from 'react';
import { View, TextInput,Text, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import useNavigationUtils from '../../../../navigation/navigationUtils';

function SelectAmountScreen({route}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('dollar');
  const [items, setItems] = useState([
    { 
      label: <Icon name="usd" size={16} color="#000" />, 
      value: 'dollar'
    },
    { 
      label: <Icon name="euro" size={16} color="#000" />, 
      value: 'euro'
    },
    { 
      label: <Icon name="gbp" size={16} color="#000" />, 
      value: 'pound'
    },
    { 
      label: <Icon name="yen" size={16} color="#000" />, 
      value: 'yen'
    },
  ]);
  const [amount,setAmount]= useState()
  const {navigateToPrevRoute} = useNavigationUtils();
  useEffect(()=>{
    console.log("amount :",amount)
  },[amount] 
  )
  const {onAmountSelect} = route.params
  return (
    <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
    <Text >Enter Amount</Text>
      <View style={{
        width: "100%",
        height: 100,
        borderRadius: 15,
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center"
      }}>
      
        {/* Text Input */}
        <TextInput 
          style={{  paddingLeft: 10 ,fontSize:60}}
          keyboardType='numeric' 
          placeholder='0.00' 
          onChangeText={(text)=>{
            console.log("amount",text)
            setAmount(text)
          }}
        />
        <TouchableOpacity style={[{
            width:"100%",
            height:50,
            justifyContent:"center" ,
            alignItems:"center" ,
        }]}
         onPress={()=>{
            onAmountSelect(amount)
            navigateToPrevRoute()
         }}
        >
            <Text style={[{fontSize:26}]} >
            Add An Amount
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SelectAmountScreen;