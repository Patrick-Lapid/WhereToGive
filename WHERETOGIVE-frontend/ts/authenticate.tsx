import React, { useContext, useState, useEffect } from "react"
import { User as FirebaseUser, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "../src/firebase"
import { notifications } from "@mantine/notifications";
import { X } from "tabler-icons-react";

interface AuthContextInterface {
    currentUser : FirebaseUser;
    setCurrentUser : React.Dispatch<React.SetStateAction<FirebaseUser>>;
    login : (email: string, password: string) => void;
    signup : (email: string, password: string, displayName : string) => void;
    logout : () => void;
    switchAccount : () => void;
    resetPassword : (email: string) => void;
    toggleCharityFavorite : (charityID : number) => string;

    invalidPassword : boolean;
    invalidEmail : boolean;
    registrationError : boolean;
    emailSent : boolean;
    resetPasswordClicked : boolean;
    modalIsOpen : boolean;
    loading : boolean;
    tagColors : any;

    setInvalidPassword : React.Dispatch<React.SetStateAction<boolean>>;
    setInvalidEmail : React.Dispatch<React.SetStateAction<boolean>>;
    setRegistrationError : React.Dispatch<React.SetStateAction<boolean>>;
    setEmailSent : React.Dispatch<React.SetStateAction<boolean>>;
    setResetPasswordClicked: React.Dispatch<React.SetStateAction<boolean>>;
    setModalIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
    
    // updateEmail : (email: string) => void,
    // updatePassword : (password : string) => void,
}

type AuthContextType = AuthContextInterface;
const AuthContext = React.createContext<AuthContextType>({} as AuthContextInterface)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children } : any) {
    const [currentUser, setCurrentUser] = useState<FirebaseUser>(null);
    const [loading, setLoading] = useState(true);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [resetPasswordClicked, setResetPasswordClicked] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function signup(email : string, password : string, name : string) {
        return createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: { user: any; }) => {
            // Signed in 
            // navigate to Dashboard on login success
            updateProfile(userCredential.user, {displayName : name}).then(async () => {
                
                try {
                    const user = await userCredential.user;
                    const response = await fetch(`http://localhost:8000/api/users`, {
                        method: 'POST',
                        body: JSON.stringify({
                          Userid: user.uid, // zcwmy3K0ONPjn72zeiPaLySbeeI3
                          DisplayName : user.displayName, // Display Name
                          City : "",
                          State : ""
                        })
                    });
    
                    console.log(response);
                    window.location.replace("/dashboard");
                        
                } catch (error) {
                    notifications.show({
                        autoClose: 5000,
                        title: "Registration Error",
                        message: error,
                        color: "red",
                        icon: <X color='white'/>,
                        className: 'my-notification-class',
                    });
                }
              }).catch((error) => {
                notifications.show({
                    autoClose: 5000,
                    title: "Registration Error",
                    message: error,
                    color: "red",
                    icon: <X color='white'/>,
                    className: 'my-notification-class',
                });
              });
            // register user in supabase
            
            
        })
        .catch((error: { code: any; message: any; }) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            if(errorCode === "auth/email-already-in-use")
            {
                setRegistrationError(true);
                setModalIsOpen(true);
            }
        });
    }

    function login(email : string, password : string) {
        return signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: { user: any; }) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            const refreshToken = user.getIdToken();
            // navigate to Dashboard on login success
            sessionStorage.setItem('Auth Token', await refreshToken);
            window.location.replace("/dashboard");
        })
        .catch((error: { code: any; message: any; }) => {
            const errorCode = error.code;
            if(errorCode === 'auth/wrong-password'){
                setInvalidPassword(true);
                setModalIsOpen(true);
            }
            if(errorCode === 'auth/user-not-found'){
                setInvalidEmail(true);
                setModalIsOpen(true);
            }
        }); 
    }

    function logout() {
        return auth.signOut().then(() => {
            setLoading(true);
            window.location.replace("/");
        });
    }

    function switchAccount(){
        return auth.signOut().then(() => {
            setLoading(true);
            window.location.replace("/login");
        });
    }

    function resetPassword(email : string) {
        return sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            setEmailSent(true);
            setModalIsOpen(true);
        })
        .catch((error: { code: any; message: any; }) => {
            console.log(error.code, error.message)
        });
    }


    // returns "Added" or "Removed" 
    const toggleCharityFavorite = (charityID : number) => {
        return "Added"
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
            setLoading(false)
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const tagColors = {
    "aapi-led" : "gray",
    "adoption" : "red",
    "afghanistan": "pink",
    "animals": "indigo",
    "athletics": "blue",
    "autism": "grape",
    "black-led": "teal",
    "buddhism": "green",
    "cancer": "lime",
    "cats": "yellow",
    "christianity": "orange",
    "climate": "grey",
    "conservation": "red",
    "coronavirus": "pink",
    "culture": "indigo",
    "dance": "blue",
    "disabilities": "grape",
    "disease": "teal",
    "dogs": "green",
    "education": "lime",
    "environment": "yellow",
    "filmandtv": "orange",
    "food-security": "grey",
    "freepress": "red",
    "gender-equality": "pink",
    "health": "indigo",
    "hinduism": "blue",
    "housing": "grape",
    "humans": "teal",
    "hurricane-ian": "green",
    "hurricane-laura": "lime",
    "immigrants": "yellow",
    "indigenous-led": "orange",
    "indigenous-peoples": "grey",
    "islam": "red",
    "judaism": "pink",
    "justice": "indigo",
    "latine-led": "blue",
    "legal": "grape",
    "lgbt": "teal",
    "libraries": "green",
    "mental-health": "lime",
    "middle-east": "yellow",
    "museums": "orange",
    "music": "grey",
    "oceans": "red",
    "parks": "pink",
    "poverty": "indigo",
    "racial-justice": "blue",
    "radio": "grape",
    "refugees": "teal",
    "religion": "green",
    "reproductive-justice": "lime",
    "research": "yellow",
    "science": "orange",
    "seniors": "grey",
    "space": "red",
    "theater": "pink",
    "transgender": "indigo",
    "ukraine": "blue",
    "veterans": "grape",
    "visualart": "teal",
    "votingrights": "green",
    "water": "lime",
    "wildfires": "yellow",
    "wildlife": "orange",
    "women-led": "grey",
    "womens-health": "red",
    "youth": "pink"
    }

    const value : AuthContextInterface = {
        currentUser,
        setCurrentUser : setCurrentUser,
        login,
        signup,
        logout,
        switchAccount,
        resetPassword,
        // updateEmail,
        // updatePassword

        invalidPassword : invalidPassword,
        invalidEmail : invalidEmail,
        registrationError : registrationError,
        emailSent : emailSent,
        resetPasswordClicked : resetPasswordClicked,
        modalIsOpen : modalIsOpen,
        loading : loading,
        tagColors : tagColors,

        setInvalidPassword : setInvalidPassword,
        setInvalidEmail : setInvalidEmail,
        setRegistrationError : setRegistrationError,
        setEmailSent : setEmailSent,
        setResetPasswordClicked: setResetPasswordClicked,
        setModalIsOpen : setModalIsOpen,
        toggleCharityFavorite : toggleCharityFavorite
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}