import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import navigationUtils from '../../navigation/navigationUtils';
// supabase
// import { signIn } from '../../services/supabase/auth/useAuthUtils';
// firebase
import { signIn } from '../../services/firebase/useAuthUtils';
import { useAuthFirebase } from '../../services/firebase/useAuth';
// Validation schema using Yup

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: Yup.string()
    .min(6, 'Password harus memiliki minimal 6 karakter')
    .required('Password wajib diisi'),
});

const LoginScreen = () => {
    const {navigateAndResetAllRoutes,navigateAndKeepTheRoutes} = navigationUtils();
    const {setFirebaseUser} = useAuthFirebase();
    // handle login submit
  const handleLogin = async (values) => {
    // retrieving target value
    console.log('Login data:', values);
    await signIn(values).then((data)=>{
      console.log("data login",data);
      if(data){
        setFirebaseUser(data);
        console.log('pass')
        navigateAndResetAllRoutes("home")
        console.log("login berhasil")
      } 
      // Tambahkan logika login di sini
      
     })
  

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Button title="Login" onPress={handleSubmit} />
          </View>
        )}
      </Formik>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigateAndKeepTheRoutes("forgotPassword")}>
          <Text style={styles.link}>Lupa Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateAndKeepTheRoutes("register")}>
          <Text style={styles.link}>Belum punya akun? Sign Up</Text>
        </TouchableOpacity>
      </View>
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
    textAlign: 'center',
    marginBottom: 20,
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
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: '#007BFF',
    marginTop: 10,
  },
});

export default LoginScreen;