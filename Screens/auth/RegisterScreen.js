import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useNavigationUtils from '../../navigation/navigationUtils';
import { supabase } from "../../services/supabase/init";

const RegisterScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { navigateAndKeepTheRoutes } = useNavigationUtils();

  // Validation Schema
  const registerValidationSchema = Yup.object().shape({
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

  // Handle user registration
  const handleRegistration = async (values) => {
    setIsLoading(true);
    
    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            username: values.username,
            is_admin: values.email === "alinuriman.dev@gmail.com",
          }
        }
      });

      if (authError) throw authError;

      // 2. Create profile in separate table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          created_at : new Date().toISOString(),
          username: values.username,
          email: values.email,
          updated_at: new Date().toISOString(),
        });

      if (profileError) throw profileError;

      // 3. Navigate based on email verification status
      if (!authData.user?.user_metadata?.email_verified) {
        navigateAndKeepTheRoutes("verifyEmail", { email: values.email });
      } else {
        Alert.alert('Registration Successful', 'Your account has been created successfully');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        "Registration Failed", 
        error.message || 'An error occurred during registration'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Form Input Component
  const FormInput = ({ field, placeholder, secureTextEntry = false, keyboardType = 'default' }) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={field.onChange(field.name)}
        onBlur={field.onBlur(field.name)}
        value={field.values[field.name]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {field.touched[field.name] && field.errors[field.name] && (
        <Text style={styles.errorText}>{field.errors[field.name]}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={registerValidationSchema}
        onSubmit={handleRegistration}
      >
        {({ 
          handleChange, 
          handleBlur, 
          handleSubmit, 
          values, 
          errors, 
          touched,
          isValid,
          dirty
        }) => (
          <View style={styles.formContainer}>
            <FormInput 
              field={{
                name: 'username',
                onChange: handleChange,
                onBlur: handleBlur,
                values,
                errors,
                touched
              }}
              placeholder="Username"
            />

            <FormInput 
              field={{
                name: 'email',
                onChange: handleChange,
                onBlur: handleBlur,
                values,
                errors,
                touched
              }}
              placeholder="Email"
              keyboardType="email-address"
            />

            <FormInput 
              field={{
                name: 'password',
                onChange: handleChange,
                onBlur: handleBlur,
                values,
                errors,
                touched
              }}
              placeholder="Password"
              secureTextEntry={true}
            />

            {isLoading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : (
              <Button 
                title="Sign Up" 
                onPress={handleSubmit} 
                disabled={!isValid || !dirty}
              />
            )}

            <TouchableOpacity 
              style={styles.loginLink} 
              onPress={() => navigateAndKeepTheRoutes("login")}
            >
              <Text style={styles.linkText}>
                Already have an account? <Text style={styles.linkHighlight}>Login here</Text>
              </Text>
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
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    color: '#666',
    fontSize: 14,
  },
  linkHighlight: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default RegisterScreen;