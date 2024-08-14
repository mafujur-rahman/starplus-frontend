import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }


    const authInfo={
        user,
        signIn
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

AuthProvider.propTypes ={
    children: PropTypes.node,
}

export default AuthProvider;