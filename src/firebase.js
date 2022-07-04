import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getFirebaseConfig } from '@/firebase-config';

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);
const db = getFirestore(app);
const serverTS = serverTimestamp();

const initFirebaseAuth = (authStateObserver) => {
    onAuthStateChanged(auth, authStateObserver);
};

const getCurrentUser = (auth) => {
    return new Promise((resolve, reject) => {
       const unsubscribe = auth.onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
       }, reject);
    });
};

export {
    app,
    auth,
    db,
    serverTS,
    initFirebaseAuth,
    getCurrentUser
};