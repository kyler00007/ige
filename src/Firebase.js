// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu6LsFIWSA17g57ZcGUBRd0jEuP7L12k8",
  authDomain: "igexao-fe8ec.firebaseapp.com",
  projectId: "igexao-fe8ec",
  storageBucket: "igexao-fe8ec.appspot.com",
  messagingSenderId: "18140432554",
  appId: "1:18140432554:web:c8d457c94cac662d3e28d3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
