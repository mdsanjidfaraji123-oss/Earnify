import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWTzZxIl2GC1tkjSwv2LK4Zv0msrgaW9o",
  authDomain: "i-m-fee-b83e8.firebaseapp.com",
  databaseURL: "https://i-m-fee-b83e8-default-rtdb.firebaseio.com",
  projectId: "i-m-fee-b83e8",
  storageBucket: "i-m-fee-b83e8.firebasestorage.app",
  messagingSenderId: "158102433979",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };
