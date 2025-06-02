import { useState } from 'react';
import { useInventory } from '../../InventoryInf/InventoryInf';
import { ProductCard } from '../ProductCard/ProductCard';
import './InventoryManager.css';

export function InventoryManager() {
  const { products, loading } = useInventory();
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: 0,
    stock: 0,
    categoria: '',
    imagen: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Aquí implementar la función para añadir el nuevo producto
    console.log('Nuevo producto:', newProduct);
    setShowAddForm(false);
    setNewProduct({
      nombre: '',
      precio: 0,
      stock: 0,
      categoria: '',
      imagen: '',
    });
  };

  // Agrupar productos por categoría
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.categoria || 'Sin categoría';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  if (loading) return <div className="loading">Cargando inventario...</div>;

  return (
    <div className="inventory-manager">
      <div className="inventory-header">
        <h2>Gestión de Inventario</h2>
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
