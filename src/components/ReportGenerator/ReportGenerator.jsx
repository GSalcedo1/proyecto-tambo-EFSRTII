import { useState, useEffect } from 'react';
import { useInventory } from '../../InventoryInf/InventoryInf';
import { generatePDFReport } from '../../utils/PdfGenerator';

export function ReportGenerator() {
  const { products, salesHistory, fetchSalesHistory } = useInventory();
  const [reportType, setReportType] = useState('inventory');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reportType === 'sales') {
      fetchSalesHistory();
    }
  }, [reportType, fetchSalesHistory]);

  const handleGenerateReport = async () => {
    setLoading(true);

    try {
      if (reportType === 'inventory') {
        await generatePDFReport(
          products,
          'Reporte de Inventario - Tambo',
          ['ID', 'Nombre', 'Categoría', 'Precio', 'Stock'],
          product => [
            product.id.slice(0, 8),
            product.nombre,
            product.categoria,
            `S/ ${product.precio.toFixed(2)}`,
            product.stock,
          ],
        );
      } else {
        await generatePDFReport(
          salesHistory,
          'Reporte de Ventas - Tambo',
          ['ID Venta', 'Producto', 'Cantidad', 'Fecha', 'Total'],
          sale => [
            sale.id.slice(0, 8),
            sale.productName,
            sale.quantity,
            new Date(sale.timestamp.seconds * 1000).toLocaleDateString(),
            `S/ ${(sale.quantity * sale.unitPrice).toFixed(2)}`,
          ],
        );
      }
    } catch (error) {
      console.error('Error al generar el reporte:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-generator">
      <h2>Generador de Reportes</h2>

      <div className="report-options">
        <label>
          <input
            type="radio"
            value="inventory"
            checked={reportType === 'inventory'}
            onChange={() => setReportType('inventory')}
          />
          Reporte de Inventario
        </label>

        <label>
          <input
            type="radio"
            value="sales"
            checked={reportType === 'sales'}
            onChange={() => setReportType('sales')}
          />
          Reporte de Ventas
        </label>
      </div>

      <button onClick={handleGenerateReport} disabled={loading} className="generate-btn">
        {loading ? 'Generando...' : 'Generar Reporte PDF'}
      </button>
    </div>
  );
}
