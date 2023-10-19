"use client";
import React from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";
import HeadFooter from "../../components/admin/HeadAndFooter";
import jsPDF from "jspdf";
import "jspdf-autotable";

const earningsReportsData = [
  {
    id: 1,
    date: "2023-10-01",
    project: "Proyecto A",
    earnings: "$500.00",
    reason: "Reclamo de emisión de Factura",
  },
  {
    id: 2,
    date: "2023-10-05",
    project: "Proyecto B",
    earnings: "$300.00",
    reason: "Falta de pago",
  },
  {
    id: 3,
    date: "2023-10-10",
    project: "Proyecto C",
    earnings: "$750.00",
    reason: "Reclamo de emisión de factura",
  },
  {
    id: 4,
    date: "2023-10-15",
    project: "Proyecto D",
    earnings: "$400.00",
    reason: "Demora en el pago",
  },
  // Agrega más entradas de reportes de ganancias aquí
];

export default function EarningsReports() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pdf, setPdf] = React.useState(null);

  const filteredReports = earningsReportsData.filter((report) =>
    report.project.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Reportes de Ganancias", 10, 10);

    const columns = [
      "ID",
      "Fecha",
      "Proyecto",
      "Ganancias",
      "Motivo del Reporte",
    ];
    const data = filteredReports.map((report) => [
      report.id,
      report.date,
      report.project,
      report.earnigns,
      report.reason,
    ]);

    doc.autoTable({
      head: [columns],
      body: data,
      startY: 20,
    });

    setPdf(doc);
  };

  const downloadPDF = () => {
    if (pdf) {
      pdf.save("reportes_de_ganancias.pdf");
    }
  };

  const handleViewOrderClick = (orderId) => {
    // Aquí puedes manejar la navegación a la Orden de Compra
    // Puedes usar una función de navegación de tu enrutador o Link de Next.js
  };

  return (
    <HeadFooter>
      <Box m="6">
        <Heading as="h2" size="lg" mb="4">
          Reportes de Ganancias
        </Heading>
        <Flex justify="center" mb="4">
          <Input
            placeholder="Buscar proyecto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mr="4"
            width="300px"
          />
          <Button colorScheme="purple" size="sm" onClick={generatePDF}>
            Generar PDF
          </Button>
          <Button
            colorScheme="purple"
            size="sm"
            onClick={downloadPDF}
            disabled={!pdf}
            ml="2"
            style={{
              cursor: pdf ? "pointer" : "default",
              pointerEvents: pdf ? "auto" : "none",
            }}
          >
            Descargar PDF
          </Button>
        </Flex>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Fecha</Th>
              <Th>Proyecto</Th>
              <Th>Ganancias</Th>
              <Th>Motivo del Reporte</Th>
              <Th>Ir a Orden de Pago</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredReports.map((report) => (
              <Tr key={report.id}>
                <Td>{report.id}</Td>
                <Td>{report.date}</Td>
                <Td>{report.project}</Td>
                <Td>{report.earnings}</Td>
                <Td>{report.reason}</Td>
                <Td>
                  <Button
                    colorScheme="purple"
                    size="sm"
                    onClick={() => handleViewOrderClick(report.id)}
                  >
                    Ver Orden
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </HeadFooter>
  );
}
