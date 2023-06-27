// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDenwD0HDGqDTaFmWxFTXZqjHVP2r0OY_s',
  authDomain: 'scissors-1d336.firebaseapp.com',
  projectId: 'scissors-1d336',
  storageBucket: 'scissors-1d336.appspot.com',
  messagingSenderId: '528836802539',
  appId: '1:528836802539:web:a17ba2afdb5d91f4128bae',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

if (process.env.NODE_ENV === 'development') {
  // Use the Firestore emulator
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  // Use the Auth emulator
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export { firebaseApp as firebase, firestore, auth, googleProvider };
