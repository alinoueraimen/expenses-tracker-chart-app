import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useNavigationUtils from '../../navigation/navigationUtils';
import {supabase} from "../../services/supabase/init"
// Validation schema using Yup
const SignUpSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const RegisterScreen = ({ navigation }) => {
    const {navigateAndKeepTheRoutes} =useNavigationUtils()
    const handleSignUp = (values) => {
        console.log('Form Values:', values);
        // Handle sign-up logic here
        supabase.auth.signUp({
            email: values.email,
            password: values.password,
        }).then(({error,data})=>{
            if(error){
                console.log("terjadi error",error);
                Alert.alert("Sign Up Gagal",error.message)
            }else{
                console.log("data sign up",data.user.user_metadata.email_verified)
                if((data.user.user_metadata.email_verified) === false){ 
                    navigateAndKeepTheRoutes("verifyEmail",{email : data.user.email})
                }
                console.log("berhasil mendaftar")
            
            }
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
                validationSchema={SignUpSchema}
                onSubmit={handleSignUp}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        {touched.username && errors.username && (
                            <Text style={styles.errorText}>{errors.username}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {touched.email && errors.email && (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {touched.password && errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}

                        <Button title="Sign Up" onPress={handleSubmit} />

                        <TouchableOpacity onPress={()=> navigateAndKeepTheRoutes("login")}>
                            <Text style={styles.linkText}>Already have an account? Login here</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    linkText: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default RegisterScreen;