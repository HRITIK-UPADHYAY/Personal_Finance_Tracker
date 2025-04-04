// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnT1L1opn0qzndOS66BBBh2uaNNinCpxk",
  authDomain: "financely-hritik.firebaseapp.com",
  projectId: "financely-hritik",
  storageBucket: "financely-hritik.firebasestorage.app",
  messagingSenderId: "849325872603",
  appId: "1:849325872603:web:091425d991d6f0848e43fe",
  measurementId: "G-78W0PK21X9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db, auth, provider, doc, setDoc};