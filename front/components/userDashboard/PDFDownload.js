import { jsPDF} from "jspdf";
import "jspdf-autotable";

export const PDFDownload = () => {
  // Crear un nuevo documento PDF
  const doc = new jsPDF("l");
  doc.setFont("helvetica");
  doc.setFontSize(30);
  doc.text("Orden de compra", 145, 20, null, null, "center");

    // Agregar contenido al PDF
    
//    doc.text("Orden de compra", 105, 15, 15, null, "center");
//   doc.addFont("/fonts/Pompiere-Regular.ttf", "Pompiere", "regular");
  doc.autoTable({
    startY: 28,
    theme: "striped",
    styles: {
      fontSize: 5,
      overflow: "linebreak",
      cellPadding: 2,
      lineColor: [0, 0, 0],
      lineWidth: 0.2,
    },
    headStyles: {
      valign: "middle",
        halign: "center",
      fontSize: 15,
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
    },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.5,
    columnStyles: {
      0: {
        halign: "center",
      },
      1: {
        halign: "center",
      },
      2: {
        halign: "center",
      },
      3: {
        halign: "center",
      },
      4: {
        halign: "center",
      },
      5: {
        halign: "left",
      },
      },
  bodyStyles: {
    fillColor: [255, 255, 255],
    textColor: 0,
    fontSize: 10,
    minCellHeight: 15,
  },
    head: [["Fecha", "N° Compra", "Estado", "Producto", "Precio", "desarrollador"]],
    body: [["17/06/2023", "AE345TG", "CANCELADA", "LARAVEL", "$45", "Steve "]],
  });

  // Descargar el PDF
  doc.save("Compra.pdf");
};
