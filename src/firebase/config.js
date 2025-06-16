import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyClIPytTWZgPCm2Un1wG7UECM9f7LUb8iE',
  authDomain: 'tambo-inventario-p2025.firebaseapp.com',
  projectId: 'tambo-inventario-p2025',
  storageBucket: 'tambo-inventario-p2025.firebasestorage.app',
  messagingSenderId: '92375940344',
  appId: '1:92375940344:web:e18b8fc2328ad76ebbcf0d',
  measurementId: 'G-X2MHWGTE11',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
