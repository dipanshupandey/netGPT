// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC0nbS74L5TcLq8YkPcFR5Vm6J3yNbxmao",
  authDomain: "netgpt-3e807.firebaseapp.com",
  projectId: "netgpt-3e807",
  storageBucket: "netgpt-3e807.firebasestorage.app",
  messagingSenderId: "53200101707",
  appId: "1:53200101707:web:5720cc87b792d17015c8ce",
  measurementId: "G-L1LLD0WHYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
