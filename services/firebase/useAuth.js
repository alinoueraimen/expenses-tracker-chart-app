// contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebaseInit';
import { 
  onAuthStateChanged, 
 
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthFirebaseProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);

  

  
  useEffect(() => {
    console.log("useEffect auth context");
    
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setFirebaseUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("firebaseUser data", firebaseUser);
  }, [firebaseUser]);

  const value = {
    setFirebaseUser,
    firebaseUser,
    loading,
   
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthFirebase = () => useContext(AuthContext);