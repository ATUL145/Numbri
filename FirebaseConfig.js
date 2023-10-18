// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeWVIjojADdP3zJrYExSoPUxAMGhmMsa8",
  authDomain: "sikka-aa81e.firebaseapp.com",
  projectId: "sikka-aa81e",
  storageBucket: "sikka-aa81e.appspot.com",
  messagingSenderId: "355544216295",
  appId: "1:355544216295:web:2851bc3c4d299864336842",
  measurementId: "G-QS0XYNMM0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);