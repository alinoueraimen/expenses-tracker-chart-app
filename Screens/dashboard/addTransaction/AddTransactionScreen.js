import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import tw from 'tailwind-react-native-classnames';
// import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from '../../../components/dashboard/addTransaction/datePicker/DatePicker';
import useNavigationUtils from '../../../navigation/navigationUtils';
import { useTransactionUtils } from '../../../context/TransactionsContext';


const ExpensesSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Must be a positive number'),
  type:Yup.string().required(`
    please select a type (expenses/income)
    `),
  category: Yup.object().required('transaction category is required'),
  date: Yup.date().required('date of transaction is required'),
});

function AddTransactionScreen() {
  const [selectedCurrency,setSelectedCurrency] = useState('')
  const [selectedAmount,setSelectedAmount] = useState('$0.00')
  const [selectedCategory,setSelectedCategory] = useState();
  const [selectedType,setSelectedType] = useState(); 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {navigateAndKeepTheRoutes,navigateToPrevRoute} = useNavigationUtils();
  const {transactionsData,setTransactionData} = useTransactionUtils();
  const handleSubmit = (values) => {
    console.log('Submitted values:', {
      amount: values.amount,
      type:values.type,
      category: values.category,
      date: values.date,
      description: values.description
    });
    const transaction = {
      amount: values.amount,
      type:values.type,
      category: values.category,
      date: values.date,
      description: values.description
    }
    setTransactionData(prev=>[...prev,transaction])
    navigateToPrevRoute();
  };

  return (
    <View style={tw`p-4`}>
      <Formik
        initialValues={{
          currency:selectedCurrency,
          amount: selectedAmount,
          type:selectedType,
          category: selectedCategory,
          date: new Date(),
          description: ""
        }}
        validationSchema={ExpensesSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View>
            {/* Input Amount */}
            <TouchableOpacity 
            onPress={()=>{
            navigateAndKeepTheRoutes("selectAmount",{
              onAmountSelect:(amount

              )=>{
                setSelectedAmount(amount),
                setFieldValue('amount',amount)
              }
            })}}
            style={tw`border border-gray-300 p-3 rounded mb-4 flex flex-row  `}>
            <Icon style={tw`mr-5`} name='dollar' size={20} color={"#000"}/>
              <Text>Input Amount</Text>
              <Text>{selectedAmount}</Text>
            </TouchableOpacity>
           
            {touched.amount && errors.amount && (
              <Text style={tw`text-red-500 text-sm mt-1`}>{errors.amount}</Text>
            )}
            {/* Input Type Transaction */}
            <View style={[tw`flex flex-row w-full border mb-4 border-gray-300`,{height:50}]}>
              <TouchableOpacity style={[{flex:1},tw`${selectedType === "expense" && 'border'} justify-center items-center`]}
              onPress={()=>{
                setSelectedType("expense")
                setFieldValue('type',`expense`)
              }}
              >
              <Icon name="arrow-circle-down" size={50} color="#e74c3c" />
              </TouchableOpacity> 
              <TouchableOpacity style={[{flex:1},tw`${selectedType === "income" && 'border'} justify-center items-center`]}
                  onPress={()=>{
                    setSelectedType("income")
                    setFieldValue('type',`income`)
                  }}
              >
              <Icon name="arrow-circle-up" size={50} color="#2ecc71" /></TouchableOpacity>  
            </View>
            {/* Input Category */}
            <TouchableOpacity onPress={()=>{
            navigateAndKeepTheRoutes("selectCategory",{
              onCategorySelect:(category)=>{
                setSelectedCategory(category),
                setFieldValue('category',category)
              }
            })}}
               style={tw`border border-gray-300 p-3 rounded mb-4 flex flex-row  `}
              >
              <Icon style={tw`mr-5`} name='th-large' size={20} color={"#000"}/>
              {selectedCategory?<Text style={{color:"gray"}}>{selectedCategory.name}</Text>:<Text style={{color:"gray"}}>Select Category</Text>}
             </TouchableOpacity>
            {touched.category && errors.category && (
              <Text style={tw`text-red-500 text-sm mt-1`}>{errors.category}</Text>
            )}
            {/* Date Picker */}
           <DatePicker setFieldValue={setFieldValue}/>

         

            {/* Submit Button */}
            <TouchableOpacity 
              style={tw`bg-blue-600 py-3 px-4 rounded-lg`}
              onPress={handleSubmit}
            >
              <Text style={tw`text-white text-center font-medium`}>Simpan</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default AddTransactionScreen;