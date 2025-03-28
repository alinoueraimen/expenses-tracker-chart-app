import React from 'react'
import { Text,View,FlatList,Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import useNavigationUtils from '../../../../navigation/navigationUtils';
function SelectCategoryScreen ({route}){
    const {width} = Dimensions.get('window');
    const itemSize = width/3-20;
    const {onCategorySelect} = route.params;
    const {navigateToPrevRoute} =useNavigationUtils();
    const handleCategoryBtnPress= ()=>{
        console.log('press')
        onCategorySelect("food"
        )
        navigateToPrevRoute()
    }
    return (<>
    <View>
        <View>
            <Text/>
        </View>
        <TouchableOpacity
        onPress={handleCategoryBtnPress}
        style={[{borderWidth:2,width:itemSize,height:itemSize}]}>
            <Icon name="cutlery" size={100} color={'#000'}/>
        </TouchableOpacity>
    </View>
    </>)
}
export default SelectCategoryScreen