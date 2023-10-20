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

const earningsHistoryData = [
  {
    id: 1,
    date: "2023-10-01",
    project: "Proyecto A",
    earnings: "$500.00",
  },
  {
    id: 2,
    date: "2023-10-05",
    project: "Proyecto B",
    earnings: "$300.00",
  },
  {
    id: 3,
    date: "2023-10-10",
    project: "Proyecto C",
    earnings: "$750.00",
  },
  {
    id: 4,
    date: "2023-10-15",
    project: "Proyecto D",
    earnings: "$400.00",
  },
  // Agrega más entradas de historial de ganancias aquí
];

export default function EarningsHistory() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pdf, setPdf] = React.useState(null);

  const filteredEarnings = earningsHistoryData.filter((earning) =>
    earning.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Historial de Ganancias", 10, 10);

    const columns = ["ID", "Fecha", "Nombre del Proyecto", "Ganancias"];
    const data = filteredEarnings.map((earning) => [
      earning.id,
      earning.date,
      earning.project,
      earning.earnings,
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
      pdf.save("historial_de_ganancias.pdf");
    }
  };

  return (
    <HeadFooter>
      <Box p="4">
        <Heading as="h2" size="lg" mb="4">
          Historial de Ganancias
        </Heading>
        <Flex justify="center" mb="4">
          <Input
            placeholder="Buscar proyecto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mr="4"
            width="300px"
          />
          <Button colorScheme="purple" size="sm" onClick={generatePDF} mr="4">
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
              <Th>Nombre del Proyecto</Th>
              <Th>Ganancias</Th>
            </Tr>
          </Thead>
          <Tbody bg="gray.200">
            {filteredEarnings.map((earning) => (
              <Tr key={earning.id}>
                <Td>{earning.id}</Td>
                <Td>{earning.date}</Td>
                <Td>{earning.project}</Td>
                <Td>{earning.earnings}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </HeadFooter>
  );
}
