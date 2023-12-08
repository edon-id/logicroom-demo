import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "logicroom-7937f.firebaseapp.com",
  projectId: "logicroom-7937f",
  storageBucket: "logicroom-7937f.appspot.com",
  messagingSenderId: "738566832470",
  appId: "1:738566832470:web:28e668d94aa771ff4916f7",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
