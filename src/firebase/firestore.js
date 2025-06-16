import { db } from './config'; // Importa la configuración de Firebase.
// Importa funciones de Firestore:
import { collection, doc, getDocs, updateDoc, onSnapshot, addDoc } from 'firebase/firestore';

const productsCollection = collection(db, 'products'); // Referencia a la colección de productos.

export const getProducts = async () => {
  // Función para obtener productos.
  const snapshot = await getDocs(productsCollection); // Obtiene los documentos de la colección.
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Devuelve un array de productos con sus IDs.
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
  await addDoc(salesCollection, {
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

export const addProductToFirestore = async productData => {
  try {
    const docRef = await addDoc(collection(db, 'products'), productData);
    return docRef.id;
  } catch (error) {
    console.error('Error añadiendo producto: ', error);
    throw error;
  }
};
