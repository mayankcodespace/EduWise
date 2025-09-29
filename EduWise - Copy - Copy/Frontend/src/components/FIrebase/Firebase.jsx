// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAUAGt59lV4CfADURkJ5jtrs1xYN5Ocvk",
  authDomain: "eduwise-a3936.firebaseapp.com",
  projectId: "eduwise-a3936",
  storageBucket: "eduwise-a3936.firebasestorage.app",
  messagingSenderId: "911742299221",
  appId: "1:911742299221:web:ddcfc557807669b3e738dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db= getFirestore(app);
export const auth= getAuth();