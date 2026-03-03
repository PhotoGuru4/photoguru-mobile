import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDQgp-6podXR7yElzgzisvt07yFLHlgj3s',
  authDomain: 'photoguru-chat.firebaseapp.com',
  projectId: 'photoguru-chat',
  storageBucket: 'photoguru-chat.firebasestorage.app',
  messagingSenderId: '6973831390',
  appId: '1:6973831390:web:581da64f7176af9f2e2a4f',
  measurementId: 'G-RN9FCWBQWP',
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
