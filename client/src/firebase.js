// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API ,
  authDomain: "auth-mern-3a899.firebaseapp.com",
  projectId: "auth-mern-3a899",
  storageBucket: "auth-mern-3a899.appspot.com",
  messagingSenderId: "594776953703",
  appId: "1:594776953703:web:6edfdec2418b1b76f995c2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);