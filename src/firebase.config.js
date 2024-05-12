import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv"
dotenv.config()

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "house-market-app-a8aa9.firebaseapp.com",
  projectId: "house-market-app-a8aa9",
  storageBucket: "house-market-app-a8aa9.appspot.com",
  messagingSenderId: "523885974962",
  appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore()

