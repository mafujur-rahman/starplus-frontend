import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const createUser = ( email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    const logout = () =>{
        return signOut(auth)
    }


    const authInfo={
        user,
        createUser,
        signIn,
        logout
    }

    useEffect(()=>{
        const unSubscribe =  onAuthStateChanged(auth, currentUser =>{
            //   console.log('user changed', currentUser)
              setUser(currentUser);
          });
          return () =>{
              unSubscribe();
          }
      },[]);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};



export default AuthProvider;