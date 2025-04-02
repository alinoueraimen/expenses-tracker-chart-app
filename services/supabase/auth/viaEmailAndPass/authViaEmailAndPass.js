// hooks/useAuth.js
import useNavigationUtils from "../../../../navigation/navigationUtils";
import { Alert } from "react-native";
import { supabase } from "../../../../services/supabase/init";
export const useHandleLogin = () => {
    const { navigateAndKeepTheRoutes } = useNavigationUtils();

    const handleLogin = async (values) => {
        const { error, data } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password
        });

        if (error) {
            Alert.alert("Login Gagal", error.message);
            return { error };
        }

        if (data.session) {
            Alert.alert("Login Berhasil");
            navigateAndKeepTheRoutes("home");
        }

        
    };

    return { handleLogin };
};
export const useHandleRegister=()=>{
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
                  
                  if((data.user.user_metadata.email_verified) === false){ 
                      navigateAndKeepTheRoutes("verifyEmail",{email : data.user.email})
                      console.log("berhasil mendaftar")
                  }
              
              }
          })
      };
      return { handleSignUp };
}