// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5rQBwIm6Sc8OeDK4PTKT8lwGz82jGrA4",
  authDomain: "expenses-tracker-chart-app.firebaseapp.com",
  projectId: "expenses-tracker-chart-app",
  storageBucket: "expenses-tracker-chart-app.firebasestorage.app",
  messagingSenderId: "847300014670",
  appId: "1:847300014670:web:7ae9fcef7f5a98a8ed891f",
  measurementId: "G-HMMB27ZTQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app