import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../Firebase/firebase.init';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // states for holding user info
    const [user, setUser] = useState(null);
    const [userDB, setUserDB] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUserDBLoading, setIsUserDBLoading] = useState(true);
    const [countRefetch, setCountRefetch] = useState(true);

    // function for signing in or singing out
    const createUser = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logInWithEmail = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logInWithGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const update = (name) => {
        setIsLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
        });
    }

    const logOut = () => {
        setIsLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setIsLoading(false);
        })
        return () => {
            return () => unsubscribe();
        }
    }, [])

    // user from db
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/users/myprofile?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setUserDB(data)
                    setIsUserDBLoading(false);
                })
                .catch(err => console.error(err));
        }
    }, [user?.email, user, userDB?.location, userDB?.phone]);
    // values
    const authInfo = {
        user,
        userDB,
        isLoading,
        createUser,
        logInWithEmail,
        logInWithGoogle,
        update,
        logOut,
        setIsLoading,
        countRefetch,
        setCountRefetch,
        isUserDBLoading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;