import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGuQU-BdEVQBkbxQo3mtEbEOKpgMqiHXg",
  authDomain: "letstalk-4285b.firebaseapp.com",
  projectId: "letstalk-4285b",
  storageBucket: "letstalk-4285b.appspot.com",
  messagingSenderId: "634469037937",
  appId: "1:634469037937:web:ba3c0f383ec0a9ac8ee8d0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();