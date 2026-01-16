import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// BURADAKİLERİ KENDİ FIREBASE PROJENDEN ALIP DEĞİŞTİR
const firebaseConfig = {
  apiKey: "AIzaSyCbsLR-kmHbRxjSynR2k1D7wUJdrv7AoLA",
  authDomain: "nova-saas-dashboard.firebaseapp.com",
  projectId: "nova-saas-dashboard",
  storageBucket: "nova-saas-dashboard.firebasestorage.app",
  messagingSenderId: "440375523547",
  appId: "1:440375523547:web:f6a1e84ab1c0b592f334fe"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // İleride veri eklemek için lazım olacak