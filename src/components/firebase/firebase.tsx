// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYXnzKeu0-qzlyEWTjLlh9Qm1TeH-Uy_Q",
  authDomain: "dev-hub-7891a.firebaseapp.com",
  projectId: "dev-hub-7891a",
  storageBucket: "dev-hub-7891a.appspot.com",
  messagingSenderId: "887594960936",
  appId: "1:887594960936:web:2214cc54a89c03a5b50d1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged }