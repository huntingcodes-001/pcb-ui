import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAyNH2oRrii3hRsU5FNIQj9dgdEZS3an-U",
  authDomain: "pcb-login.firebaseapp.com",
  projectId: "pcb-login",
  storageBucket: "pcb-login.firebasestorage.app",
  messagingSenderId: "948670429527",
  appId: "1:948670429527:web:de256d722a815ceefc6612",
  measurementId: "G-QD52YLHYWX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);