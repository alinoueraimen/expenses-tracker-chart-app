import { Text, View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useAuth } from '../services/supabase/auth/useAuth'; // Pastikan path ini benar

const authSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup
    .string()
    .min(8, 'Password must contain minimally 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      'Password must contain uppercase, lowercase, and numbers'
    )
    .required("Password required")
});

export default function TestingScreen() {
  const { signUp, loading, error: authError,session } = useAuth();
  
  const handleLogin = async (values) => {
    try {
      await signUp(values.email, values.password)
      console.log("berhasil !!")
      // Jika login berhasil, pengguna akan diarahkan otomatis melalui onAuthStateChange
    } catch (error) {
      console.error("Login error:", error);
      // Error sudah dihandle di useAuth, tidak perlu dihandle lagi di sini
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Log in</Text>
      </View>
      
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={authSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
              autoCapitalize="none"
              editable={!loading}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            
            {authError && (
              <Text style={styles.errorText}>{authError.message}</Text>
            )}
            
            <View style={styles.buttonContainer}>
              {loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Button 
                  onPress={handleSubmit} 
                  title="Login" 
                  disabled={loading}
                />
              )}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 30,
    flex: 1,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  }
});