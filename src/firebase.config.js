import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKSQqGwfjWkuAUrV26Q_qQ0SNYPIr3aTM",
  authDomain: "house-market-app-a8aa9.firebaseapp.com",
  projectId: "house-market-app-a8aa9",
  storageBucket: "house-market-app-a8aa9.appspot.com",
  messagingSenderId: "523885974962",
  appId: "1:523885974962:web:4b027d30c98da92b4540ab", 
};

initializeApp(firebaseConfig);
export const db = getFirestore()

