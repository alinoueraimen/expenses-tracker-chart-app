// contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import {supabase} from "../init"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect auth context")
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("get session ....",session)
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);
    useEffect(()=>{
    console.log("user data",user);
    console.log("session data",session);
    },[session,user])
  const value = {
    user,
    session,
    loading,
    signUp: async (email, password) => {
      const { error,data } = await supabase.auth.signUp({ email, password });
      console.log(data)
      return { error };
    },
    signIn : async(email,password)=>{
      const {error,data} = await supabase.auth.signIn({
        email,password
      })

    },
    signOut: async () => {
      await supabase.auth.signOut();
    },
    // Tambahkan fungsi auth lainnya sesuai kebutuhan
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);