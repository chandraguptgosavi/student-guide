// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcpIL1xRhx5YOwsY0lIW5B_kjez_2UuyY",
  authDomain: "interview-preparation-system.firebaseapp.com",
  projectId: "interview-preparation-system",
  storageBucket: "interview-preparation-system.appspot.com",
  messagingSenderId: "855019671473",
  appId: "1:855019671473:web:1d5a66f6596581519db790",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export default FirebaseApp;