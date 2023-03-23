// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbEmJZ6uU7bsEq78DdYanZQmIIOSCwuik",
    authDomain: "wheretogive-2698e.firebaseapp.com",
    projectId: "wheretogive-2698e",
    storageBucket: "wheretogive-2698e.appspot.com",
    messagingSenderId: "417927088599",
    appId: "1:417927088599:web:2ed92e11ce080856c16392",
    measurementId: "G-KLXB6JNNNV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
