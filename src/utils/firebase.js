// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6wFeRgJLwuXeO_oU_OCSwVxszOucc8W0",
  authDomain: "shoebuy-shop.firebaseapp.com",
  projectId: "shoebuy-shop",
  storageBucket: "shoebuy-shop.appspot.com",
  messagingSenderId: "271967304138",
  appId: "1:271967304138:web:1d50616fa549ed9ed2b733",
};


// const firebaseConfig = {
//   apiKey: "AIzaSyBNizkTL74SE4Mu4DKQqw-4g161EjXojzw",
//   authDomain: "react-authendication.firebaseapp.com",
//   projectId: "react-authendication",
//   storageBucket: "react-authendication.appspot.com",
//   messagingSenderId: "31161923510",
//   appId: "1:31161923510:web:ac7597ec82ffc3fa0ff317",
// };



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { db, firestore, storage };



