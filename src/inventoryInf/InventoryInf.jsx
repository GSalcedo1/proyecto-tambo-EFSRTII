import { createContext, useContext, useEffect, useState } from 'react';
import {
  getProductsRealtime,
  updateProductStock,
  recordSale,
  getSalesHistory,
  addProductToFirestore,
} from '../firebase/firestore';

const InventoryInf = createContext(); // Contexto para el inventario.

// Componente proveedor del contexto.
export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Almacena todos los productos del inventario.
  const [loading, setLoading] = useState(true); // Indica si los datos están cargando.
  const [salesHistory, setSalesHistory] = useState([]); // 	Almacena el historial de ventas.

  useEffect(() => {
    // Aquí, cuando React ejecuta el efecto tras el primer render,
    // se invoca getProductsRealtime y por tanto se abre la suscripción.
    const unsubscribe = getProductsRealtime(products => {
      setProducts(products); // Actualiza tu estado local de React con el nuevo array de productos.
      setLoading(false); // Indica que la carga ha finalizado.
    });

    return () => unsubscribe(); // Limpia la suscripción al desmontar el componente.
  }, []);

  // Obtener historial de ventas
  const fetchSalesHistory = async () => {
    const history = await getSalesHistory();
    setSalesHistory(history);
  };

  // Actualizar stock
  const updateStock = async (productId, newStock) => {
    await updateProductStock(productId, newStock);
  };

  // Registrar una venta
  const registerSale = async saleData => {
    await recordSale(saleData);
    await fetchSalesHistory();
  };

  // Añadir nuevo producto
  const addProduct = async productData => {
    try {
      await addProductToFirestore(productData);
    } catch (error) {
      console.error('Error al añadir el producto:', error);
    }
  };

  return (
    <InventoryInf.Provider
      value={{
        products,
        loading,
        salesHistory,
        updateStock,
        registerSale,
        fetchSalesHistory,
        addProduct,
      }}
    >
      {children}
    </InventoryInf.Provider>
  );
};

export const useInventory = () => useContext(InventoryInf); // Hook para usar el contexto de inventario
