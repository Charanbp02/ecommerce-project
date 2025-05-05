import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // ✅ Import

const firebaseConfig = {
  apiKey: "AIzaSyCPp1rVIDO0JjYZsWIL1m4273RHwdvg84A",
  authDomain: "clothes-store-500d9.firebaseapp.com",
  projectId: "clothes-store-500d9",
  storageBucket: "clothes-store-500d9.appspot.com",
  messagingSenderId: "848967934568",
  appId: "1:848967934568:web:41146d8e78c26b9da051dd",
  measurementId: "G-D4EN8WJMLB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Export Firestore
