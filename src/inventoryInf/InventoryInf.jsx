import { createContext, useContext, useEffect, useState } from 'react';
import { getProductsRealtime, updateProductStock, recordSale, getSalesHistory } from '../firebase/firestore';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salesHistory, setSalesHistory] = useState([]);

  // Obtener productos en tiempo real
  useEffect(() => {
    const unsubscribe = getProductsRealtime(products => {
      setProducts(products);
      setLoading(false);
    });

    return () => unsubscribe();
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
    // Implementar según necesidad
  };

  return (
    <InventoryContext.Provider
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
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
