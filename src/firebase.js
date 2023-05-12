import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBf1rYLMTXenQE7Si1hoeEuN5yBtZ4ug7s",
    authDomain: "water-tracker-e7ae4.firebaseapp.com",
    databaseURL: "https://water-tracker-e7ae4-default-rtdb.firebaseio.com",
    projectId: "water-tracker-e7ae4",
    storageBucket: "water-tracker-e7ae4.appspot.com",
    messagingSenderId: "281373101787",
    appId: "1:281373101787:web:07c48295edb2e6b12a06fe",
    measurementId: "G-NRG0ZFX7BW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
