import React, { useContext, useState, useEffect } from "react";
import { auth } from '../firebase-config'

import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    sendSignInLinkToEmail,
    signInWithEmailLink,
    isSignInWithEmailLink,
    signOut,
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setcurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [showAlert, setshowAlert] = useState(false)

    const [status, setStatus] = useState("")

    // Sign In with Google
    function googleSignIn() {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    // Sign Out
    function userSignOut() {
        return signOut(auth)
    }

    // Email Sign in with Link
    
    function sendLink(email) {

        const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'https://vmc-counter.web.app/verification', 
            // http://localhost:3000/
            // https://vmc-counter.web.app/
            // This must be true.
            handleCodeInApp: true,
            // iOS: {
            //   bundleId: 'com.example.ios'
            // },
            // android: {
            //   packageName: 'com.example.android',
            //   installApp: true,
            //   minimumVersion: '12'
            // },
            // dynamicLinkDomain: 'example.page.link'
          };

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem('emailForSignIn', email);
            console.log("Successful");
            setshowAlert(true)
            return "link-sent"
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            // ...
        });
    }

    useEffect(() => {

        // Confirm the link is a sign-in with email link.
        if (isSignInWithEmailLink(auth, window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn');
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
            setStatus("success");

            })
            .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
            setStatus("error");
            });
        }
    }, [])


    const value = {
        currentUser,
        googleSignIn,
        sendLink,
        userSignOut,
        showAlert,
        status,
    }

    useEffect(() => {
        setLoading(true)
        const unsubscribe = auth.onAuthStateChanged(user => {
            setcurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
