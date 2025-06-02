import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  doc.autoTable({
    head: [headers],
    body: tableData,
    startY: 30,
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [122, 20, 131], // Morado Tambo
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  // Total para inventario
  if (title.includes('Inventario')) {
    const totalStock = data.reduce((sum, product) => sum + product.stock, 0);
    const totalValue = data.reduce((sum, product) => sum + product.precio * product.stock, 0);

    doc.setFontSize(12);
    doc.text(`Total de Productos: ${data.length}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Total de Stock: ${totalStock} unidades`, 14, doc.autoTable.previous.finalY + 20);
    doc.text(`Valor Total: S/ ${totalValue.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 30);
  }

  // Guardar PDF
  doc.save(`${title.replace(/ /g, '_')}_${date.replace(/\//g, '-')}.pdf`);
};
