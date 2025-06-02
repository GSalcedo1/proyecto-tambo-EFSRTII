import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: '',
  authDomain: 'EL-NOMBRE-DEL-PROYECTO.firebaseapp.com',
  projectId: 'EL-NOMBRE-DEL-PROYECTO',
  storageBucket: 'EL-NOMBRE-DEL-PROYECTO.appspot.com',
  messagingSenderId: '',
  appId: '',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
