import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from '../../../components/dashboard/addTransaction/datePicker/DatePicker';
import useNavigationUtils from '../../../navigation/navigationUtils';
import { useTransactionUtils } from '../../../context/TransactionsContext';
import { supabase } from '../../../services/supabase/init';
import { useAuth } from '../../../services/supabase/auth/useAuth';
import { addTransactionDoc } from '../../../services/firebase/databases/transactionCollection';
import {useAuthFirebase} from '../../../services/firebase/useAuth';


const ExpensesSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Must be a positive number'),
  type: Yup.string().required('Please select a type (expense/income)'),
  category: Yup.object().required('Transaction category is required'),
  date: Yup.date().required('Date of transaction is required'),
});

function AddTransactionScreen() {
  const [selectedAmount, setSelectedAmount] = useState('0.00');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const { navigateToPrevRoute,navigateAndKeepTheRoutes } = useNavigationUtils();
  const { setTransactionData } = useTransactionUtils();
  const {user} =useAuth();
  const {firebaseUser} = useAuthFirebase();
  const handleSubmit = async (values) => {
      if(firebaseUser){
        try {
          console.log("firebase user (addTransaction) : ",firebaseUser)
          // Format data untuk PostgreSQL
          const transaction = {
            user_id: firebaseUser.uid,
            amount: parseFloat(values.amount), // Pastikan number, bukan string
            transaction_type: values.type,    // Sesuai nama kolom di database
            category_name: values.category.name,   // Simpan sebagai string
            category_imgID :values.category.imgID,
            transaction_date: values.date.toISOString(), // Format ISO 8601
            description: values.description || null      // NULL jika kosong
          };
          
          console.log("Submitting transaction:", transaction);
          setTransactionData(prev => [...prev, transaction]);
          navigateToPrevRoute();
          // insert ke firebase
          await addTransactionDoc( transaction.user_id,transaction.amount,transaction.transaction_type,transaction.category_name,transaction.category_imgID,transaction.transaction_date,transaction.description)
          // Insert ke Supabase
          // const { data, error } = await supabase
          //   .from('transactions')
          //   .insert(transaction)
          //   .select();
          
          // if (error) throw error;
          
          // console.log("Transaction saved successfully:", data);
         
        } catch (error) {
          console.error("Error saving transaction:", error);
        }
    }else{
      Alert.alert("Please login first")
    }
    
  };

  return (
    <View style={tw`p-4`}>
      <Formik
        initialValues={{
          amount: selectedAmount,
          type: selectedType,
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
              onPress={() => {
                navigateAndKeepTheRoutes("selectAmount", {
                  onAmountSelect: (amount) => {
                    const numericAmount = amount.replace(/[^0-9.]/g, '');
                    setSelectedAmount(numericAmount);
                    setFieldValue('amount', numericAmount);
                  }
                });
              }}
              style={tw`border border-gray-300 p-3 rounded mb-4 flex flex-row`}
            >
              <Icon style={tw`mr-5`} name='dollar' size={20} color={"#000"}/>
              <Text>Input Amount</Text>
              <Text>${selectedAmount}</Text>
            </TouchableOpacity>
           
            {touched.amount && errors.amount && (
              <Text style={tw`text-red-500 text-sm mt-1`}>{errors.amount}</Text>
            )}

            {/* Input Type Transaction */}
            <View style={[tw`flex flex-row w-full border mb-4 border-gray-300`, {height:50}]}>
              <TouchableOpacity 
                style={[
                  {flex:1}, 
                  tw`${selectedType === "expense" ? 'border-b-2 border-red-500' : ''} justify-center items-center`
                ]}
                onPress={() => {
                  setSelectedType("expense");
                  setFieldValue('type', "expense");
                }}
              >
                <Icon name="arrow-circle-down" size={30} color="#e74c3c" />
                <Text style={tw`text-xs mt-1`}>Expense</Text>
              </TouchableOpacity> 
              
              <TouchableOpacity 
                style={[
                  {flex:1}, 
                  tw`${selectedType === "income" ? 'border-b-2 border-green-500' : ''} justify-center items-center`
                ]}
                onPress={() => {
                  setSelectedType("income");
                  setFieldValue('type', "income");
                }}
              >
                <Icon name="arrow-circle-up" size={30} color="#2ecc71" />
                <Text style={tw`text-xs mt-1`}>Income</Text>
              </TouchableOpacity>  
            </View>

            {/* Input Category */}
            <TouchableOpacity 
              onPress={() => {
                navigateAndKeepTheRoutes("selectCategory", {
                  onCategorySelect: (category) => {
                    setSelectedCategory(category);
                    setFieldValue('category', category);
                  }
                });
              }}
              style={tw`border border-gray-300 p-3 rounded mb-4 flex flex-row`}
            >
              <Icon style={tw`mr-5`} name='th-large' size={20} color={"#000"}/>
              {selectedCategory ? (
                <Text style={tw`text-gray-600`}>{selectedCategory.name}</Text>
              ) : (
                <Text style={tw`text-gray-400`}>Select Category</Text>
              )}
            </TouchableOpacity>
            
            {touched.category && errors.category && (
              <Text style={tw`text-red-500 text-sm mt-1`}>{errors.category}</Text>
            )}

            {/* Date Picker */}
            <DatePicker 
              setFieldValue={setFieldValue} 
              initialDate={values.date}
            />

            {/* Description Input */}
            <TextInput
              style={tw`border border-gray-300 p-3 rounded mb-4`}
              placeholder="Description (optional)"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
            />

            {/* Submit Button */}
            <TouchableOpacity 
              style={tw`bg-blue-600 py-3 px-4 rounded-lg mt-4`}
              onPress={handleSubmit}
            >
              <Text style={tw`text-white text-center font-medium`}>Save Transaction</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default AddTransactionScreen;