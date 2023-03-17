import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYbCorNaJHUQr_O7o_KsNoDihBZ9BYXyY",
  authDomain: "rn-hw-1.firebaseapp.com",
  projectId: "rn-hw-1",
  storageBucket: "rn-hw-1.appspot.com",
  messagingSenderId: "8812233063",
  appId: "1:8812233063:web:58d2561a8d70e9f351afc2",
  measurementId: "G-SMHYRLB21X",
};
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
