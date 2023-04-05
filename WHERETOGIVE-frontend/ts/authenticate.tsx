import React, { useContext, useState, useEffect } from "react"
import { User as FirebaseUser, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "../src/firebase"

interface AuthContextInterface {
    currentUser : FirebaseUser;
    setCurrentUser : React.Dispatch<React.SetStateAction<FirebaseUser>>;
    login : (email: string, password: string) => void;
    signup : (email: string, password: string, displayName : string) => void;
    logout : () => void;
    resetPassword : (email: string) => void;

    invalidPassword : boolean;
    invalidEmail : boolean;
    registrationError : boolean;
    emailSent : boolean;
    resetPasswordClicked : boolean;
    modalIsOpen : boolean;
    loading : boolean;

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
                console.log("Display Name Saved");
                try {
                    const user = await userCredential.user;
                    console.log(user.uid);
                    const response = await fetch(`http://localhost:8000/api/users/`, {
                        method: 'POST',
                        body: JSON.stringify({
                          Userid: user.uid, // zcwmy3K0ONPjn72zeiPaLySbeeI3
                          DisplayName : user.displayName, // Display Name
                          City : "",
                          State : ""
                        })
                    });
    
                    console.log(response);
                    // window.location.replace("/dashboard");
                        
                } catch (error) {
                    console.log(error);
                }
              }).catch((error) => {
                console.log("PROFILE ERROR")
              });
            // register user in supabase
            
            
        })
        .catch((error: { code: any; message: any; }) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            if(errorCode == "auth/email-already-in-use")
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
            const refreshToken = user.getIdToken();
            // navigate to Dashboard on login success
            sessionStorage.setItem('Auth Token', await refreshToken);
            window.location.replace("/dashboard");
        })
        .catch((error: { code: any; message: any; }) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode == 'auth/wrong-password'){
                setInvalidPassword(true);
                setModalIsOpen(true);
            }
            if(errorCode == 'auth/user-not-found'){
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

    function resetPassword(email : string) {
        return sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            setEmailSent(true);
            setModalIsOpen(true);
        })
        .catch((error: { code: any; message: any; }) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    //   function updateEmail(email : string) {
    //     return currentUser.updateEmail(email)
    //   }

    //   function updatePassword(password : string) {
    //     return currentUser.updatePassword(password)
    //   }


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

    const value : AuthContextInterface = {
        currentUser,
        setCurrentUser : setCurrentUser,
        login,
        signup,
        logout,
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

        setInvalidPassword : setInvalidPassword,
        setInvalidEmail : setInvalidEmail,
        setRegistrationError : setRegistrationError,
        setEmailSent : setEmailSent,
        setResetPasswordClicked: setResetPasswordClicked,
        setModalIsOpen : setModalIsOpen,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}