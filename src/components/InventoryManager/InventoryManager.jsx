import { useState } from 'react';
import { useInventory } from '../../InventoryInf/InventoryInf'; // Importar el hook personalizado para acceder al contexto de inventario.
import { ProductCard } from '../ProductCard/ProductCard'; // Importar el componente ProductCard para mostrar los productos.
import './InventoryManager.css';

export function InventoryManager() {
  // Componente principal para gestionar el inventario.
  const { addProduct } = useInventory(); // Importar la función addProduct del contexto de inventario para añadir nuevos productos.
  const { products, loading } = useInventory(); // Obtener productos y estado de carga desde el contexto de inventario.
  const [newProduct, setNewProduct] = useState({
    // Estado para manejar el nuevo producto a añadir.
    nombre: '',
    precio: 0,
    stock: 0,
    categoria: '',
    imagen: '',
  });

  const [showAddForm, setShowAddForm] = useState(false); // Estado para mostrar/ocultar el formulario de añadir producto

  const handleInputChange = e => {
    // Manejar cambios en los campos del formulario.
    const { name, value } = e.target; // Desestructurar el evento para obtener el nombre y valor del campo.
    setNewProduct(prev => ({
      ...prev,
      // Actualizar el estado del nuevo producto con el valor del campo modificado.
      // Convertir los campos 'precio' y 'stock' a número, el resto se mantiene como texto.
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value, // Convertir precio y stock a número, el resto como texto.
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addProduct(newProduct); // Usa la función del contexto
      console.log('Producto guardado en Firebase');
      setShowAddForm(false);
      setNewProduct({
        nombre: '',
        precio: 0,
        stock: 0,
        categoria: '',
        imagen: '',
      });
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  // Agrupar productos por categoría
  const productsByCategory = products.reduce((acc, product) => {
    // Si la categoría no está definida, asignar 'Sin categoría'.
    const category = product.categoria || 'Sin categoría';
    // Agrupar productos por su categoría, si no existe, crea un nuevo array con el nombre de la categoria.
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  if (loading) return <div className="loading">Cargando inventario...</div>;

  return (
    <div className="inventory-manager">
      <div className="inventory-header">
        <h2>Inventario</h2>
        <button className="add-product-btn" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancelar' : 'Añadir Producto'}
        </button>
      </div>

      {showAddForm && (
        <form className="add-product-form" onSubmit={handleSubmit}>
          <h3>Añadir Nuevo Producto</h3>
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={newProduct.nombre} onChange={handleInputChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Precio (S/):</label>
              <input
                type="number"
                name="precio"
                value={newProduct.precio}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label>Stock Inicial:</label>
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Categoría:</label>
            <input type="text" name="categoria" value={newProduct.categoria} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>URL de Imagen:</label>
            <input type="text" name="imagen" value={newProduct.imagen} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="submit-btn">
            Guardar Producto
          </button>
        </form>
      )}

      {Object.entries(productsByCategory).map(([category, products]) => (
        <section key={category} className="category-section">
          <h3 className="category-title">{category}</h3>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
