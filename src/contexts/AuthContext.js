import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const UserContext = createContext();
const auth = getAuth(app);

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    // 1. createUser
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // 2. update Name 
    const updateName = (name) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    }

    // 3. GoogleSigIn 
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    // Email&passwordLogin  
    const loginWithEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    // 5. logOut 
    const logOut = () => {
        localStorage.removeItem('token');
        return signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('current user inside state', currentUser);
            setUser(currentUser);
            setLoading(false);
        })

        return () => unsubscribe();

    }, []);


    const authInfo = {
        user,
        createUser,
        updateName,
        googleSignIn,
        loginWithEmail,
        logOut,
        loading,

    }

    return (
        <UserContext.Provider value={authInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default AuthContext;