import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyCewDgQTYhpWktoAPLVr3OnFcCBa7p_ie0",
  // authDomain: "letstalk-1c5d1.firebaseapp.com",
  // projectId: "letstalk-1c5d1",
  // storageBucket: "letstalk-1c5d1.appspot.com",
  // messagingSenderId: "531227181567",
  // appId: "1:531227181567:web:72a5fbd46f3b2c2afb67ca"

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();