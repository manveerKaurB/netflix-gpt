// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtbi5CakFabOlVsh_zEuYZfdsJ4wTiUuA",
  authDomain: "netflixgpt-f14e3.firebaseapp.com",
  projectId: "netflixgpt-f14e3",
  storageBucket: "netflixgpt-f14e3.appspot.com",
  messagingSenderId: "222343907356",
  appId: "1:222343907356:web:75af6e4859bd506f70b7d9",
  measurementId: "G-94VSVTW4CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();