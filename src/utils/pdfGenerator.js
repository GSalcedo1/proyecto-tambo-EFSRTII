import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'; // Importación corregida

export const generatePDFReport = (data, title, headers, rowMapper) => {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text(title, 14, 15);

  // Fecha
  const date = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.text(`Fecha: ${date}`, 14, 22);

  // Tabla
  const tableData = data.map(item => rowMapper(item));

  autoTable(doc, {
    head: [headers],
    body: tableData,
    startY: 30,
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [122, 20, 131],
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  if (title.includes('Inventario')) {
    const totalStock = data.reduce((sum, product) => sum + product.stock, 0);
    const totalValue = data.reduce((sum, product) => sum + product.precio * product.stock, 0);

    const finalY = doc.lastAutoTable.finalY || 30;

    doc.setFontSize(12);
    doc.text(`Total de Productos: ${data.length}`, 14, finalY + 10);
    doc.text(`Total de Stock: ${totalStock} unidades`, 14, finalY + 20);
    doc.text(`Valor Total: S/ ${totalValue.toFixed(2)}`, 14, finalY + 30);
  }

  // Guardar PDF
  doc.save(`${title.replace(/ /g, '_')}_${date.replace(/\//g, '-')}.pdf`);
};
