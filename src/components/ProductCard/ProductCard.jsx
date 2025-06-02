import { useState } from 'react';
import { useInventory } from '../../InventoryInf/InventoryInf';
import './ProductCard.css';

export function ProductCard({ product }) {
  const { id, nombre, precio, imagen, stock } = product;
  const { updateStock } = useInventory();
  const [localStock, setLocalStock] = useState(stock);
  const [adjusting, setAdjusting] = useState(false);
  const [adjustmentValue, setAdjustmentValue] = useState(0);

  const handleAdjustStock = () => {
    setAdjusting(true);
    setAdjustmentValue(0);
  };

  const confirmAdjustment = async () => {
    const newStock = localStock + adjustmentValue;
    setLocalStock(newStock);
    await updateStock(id, newStock);
    setAdjusting(false);
  };

  const cancelAdjustment = () => {
    setAdjusting(false);
  };

  return (
    <article className="tambo-productCard">
      <div className="tambo-productCard-imagenContainer">
        <img className="tambo-productCard-imagen" src={imagen} alt={nombre} />
      </div>

      <div className="tambo-productCard-info">
        <strong className="tambo-productCard-nombre">{nombre}</strong>
        <p className="tambo-productCard-precio">S/ {precio.toFixed(2)}</p>
        <p className="tambo-productCard-stock">Stock: {localStock}</p>
      </div>

      <div className="tambo-productCard-controles">
        {adjusting ? (
          <div className="stock-adjustment">
            <input
              type="number"
              value={adjustmentValue}
              onChange={e => setAdjustmentValue(Number(e.target.value))}
              className="adjustment-input"
            />
            <button onClick={confirmAdjustment} className="adjustment-btn confirm">
              ✓
            </button>
            <button onClick={cancelAdjustment} className="adjustment-btn cancel">
              ✗
            </button>
          </div>
        ) : (
          <button className="tambo-productCard-btn" onClick={handleAdjustStock}>
            Ajustar
          </button>
        )}
      </div>
    </article>
  );
}
