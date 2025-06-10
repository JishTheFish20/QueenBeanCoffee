// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqBfgAai1Lv36J1DogoTYDESrBtThwVcM",
  authDomain: "queenbean-513f2.firebaseapp.com",
  projectId: "queenbean-513f2",
  storageBucket: "queenbean-513f2.firebasestorage.app",
  messagingSenderId: "400672418029",
  appId: "1:400672418029:web:42a470482dc6350f8f84e4",
  measurementId: "G-W88NFMW5JZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
