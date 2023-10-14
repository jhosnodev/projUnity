import React, { useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex
} from "@chakra-ui/react";
import HeadFooter from "../../components/admin/HeadAndFooter";
import jsPDF from "jspdf";
import "jspdf-autotable";

const userReportsData = [
  {
    id: 1,
    date: "2023-10-02",
    reporter: "Usuario 1",
    reason: "Comportamiento inapropiado",
  },
  {
    id: 2,
    date: "2023-10-07",
    reporter: "Usuario 2",
    reason: "Spam",
  },
  {
    id: 3,
    date: "2023-10-12",
    reporter: "Usuario 3",
    reason: "Incumplimiento de normas",
  },
  {
    id: 4,
    date: "2023-11-22",
    reporter: "Usuario 4",
    reason: "Spam",
  },
  {
    id: 5,
    date: "2023-11-30",
    reporter: "Usuario 5",
    reason: "Contenido ofensivo",
  },
  {
    id: 6,
    date: "2023-12-05",
    reporter: "Usuario 6",
    reason: "Acoso",
  },
  // Agrega más entradas de reportes aquí
];

export default function ReportesUsuarios() {
  const [pdf, setPdf] = useState(null);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Reportes de Usuarios", 10, 10);

    const columns = ["ID", "Fecha", "Reportado por", "Razón del reporte"];
    const data = userReportsData.map((reportItem) => [
      reportItem.id,
      reportItem.date,
      reportItem.reporter,
      reportItem.reason,
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
      pdf.save("reportes_de_usuarios.pdf");
    }
  };

  return (
    <HeadFooter>
      <Box mb="8" mt="8">
        <Heading as="h2" size="md">
          Reportes de Usuarios
        </Heading>
        <Flex justify="flex-end" mr="8">
          
        <Button
          colorScheme="purple"
          size="sm"
          onClick={generatePDF}
          mr="4"
        >
          Generar PDF
        </Button>
        <Button
          colorScheme="purple"
          size="sm"
          onClick={downloadPDF}
          disabled={!pdf}
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
              <Th>Reportado por</Th>
              <Th>Razón del reporte</Th>
            </Tr>
          </Thead>
          <Tbody bg="gray.200">
            {userReportsData.map((reportItem) => (
              <Tr key={reportItem.id}>
                <Td>{reportItem.id}</Td>
                <Td>{reportItem.date}</Td>
                <Td>{reportItem.reporter}</Td>
                <Td>{reportItem.reason}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </HeadFooter>
  );
}
