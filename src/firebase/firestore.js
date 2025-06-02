import { db } from './config';
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

// Referencia a la colección de productos
const productsCollection = collection(db, 'products');

// Obtener todos los productos
export const getProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Obtener productos en tiempo real
export const getProductsRealtime = callback => {
  return onSnapshot(productsCollection, snapshot => {
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(products);
  });
};

// Actualizar stock de un producto
export const updateProductStock = async (productId, newStock) => {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, { stock: newStock });
};

// Registrar una venta
export const recordSale = async saleData => {
  const salesCollection = collection(db, 'sales');
  await setDoc(doc(salesCollection), {
    ...saleData,
    timestamp: new Date(),
  });
};

// Obtener historial de ventas
export const getSalesHistory = async () => {
  const salesCollection = collection(db, 'sales');
  const snapshot = await getDocs(salesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
