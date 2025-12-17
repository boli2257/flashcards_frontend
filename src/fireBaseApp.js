import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { fireBaseConfig } from "./firebaseConfig";

const app = initializeApp(fireBaseConfig);
export const db=getFirestore(app)//Firestore adatbázis inicializálása