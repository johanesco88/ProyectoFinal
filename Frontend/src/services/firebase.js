import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0N3dNqvDsgjW79ps9m8v3D9Tt-t8v67c",
  authDomain: "ondascolciencias-340e0.firebaseapp.com",
  projectId: "ondascolciencias-340e0",
  storageBucket: "ondascolciencias-340e0.firebasestorage.app",
  messagingSenderId: "426631762662",
  appId: "1:426631762662:web:3222aeb263a58edbf56127"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };