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
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";
import HeadFooter from "../../components/admin/HeadAndFooter";
import jsPDF from "jspdf";
import "jspdf-autotable";

const projectHistoryData = [
  {
    id: 1,
    name: "Proyecto A",
    owner: "Usuario 1",
    startDate: "2023-10-01",
    endDate: "2023-10-15",
  },
  {
    id: 2,
    name: "Proyecto B",
    owner: "Usuario 2",
    startDate: "2023-09-15",
    endDate: "2023-10-10",
  },
  {
    id: 3,
    name: "Proyecto C",
    owner: "Usuario 3",
    startDate: "2023-10-05",
    endDate: "2023-10-20",
  },
  {
    id: 4,
    name: "Proyecto D",
    owner: "Usuario 4",
    startDate: "2023-09-20",
    endDate: "2023-10-05",
  },
  {
    id: 5,
    name: "Proyecto E",
    owner: "Usuario 5",
    startDate: "2023-10-12",
    endDate: "2023-10-30",
  },
  {
    id: 6,
    name: "Proyecto F",
    owner: "Usuario 6",
    startDate: "2023-10-08",
    endDate: "2023-10-25",
  },
  // Agrega más proyectos al historial aquí
];

export default function ProjectHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pdf, setPdf] = useState(null);

  const filteredProjects = projectHistoryData.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Historial de Proyectos", 10, 10);

    const columns = ["ID", "Nombre del Proyecto", "Propietario", "Fecha de Inicio", "Fecha de Finalización"];
    const data = filteredProjects.map((project) => [
      project.id,
      project.name,
      project.owner,
      project.startDate,
      project.endDate,
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
      pdf.save("historial_de_proyectos.pdf");
    }
  };

  return (
    <HeadFooter>
      <Box p="4">
        <Heading as="h2" size="lg" mb="4">
          Historial de Proyectos
        </Heading>
        <Flex justify="center" mb="4">
          <Input
            placeholder="Buscar proyecto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            width="300px"
            mr="4"
          />
          <Button colorScheme="purple" onClick={generatePDF} mr="4">
            Generar PDF
          </Button>
          <Button
            colorScheme="purple"
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
              <Th>Nombre del Proyecto</Th>
              <Th>Propietario</Th>
              <Th>Fecha de Inicio</Th>
              <Th>Fecha de Finalización</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredProjects.map((project) => (
              <Tr key={project.id}>
                <Td>{project.id}</Td>
                <Td>{project.name}</Td>
                <Td>{project.owner}</Td>
                <Td>{project.startDate}</Td>
                <Td>{project.endDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </HeadFooter>
  );
}
