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
  Select,
  Button,
  Flex,
  Input
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import HeadFooter from "../../components/admin/HeadAndFooter";
import jsPDF from "jspdf";
import "jspdf-autotable";

const userHistoryData = [
  {
    userId: 1,
    name: "Carolina",
    date: "2023-10-01",
    action: "Registro",
  },
  {
    userId: 2,
    name: "Enzo",
    date: "2023-10-05",
    action: "Inicio de sesión",
  },
  {
    userId: 1,
    name: "Fabio",
    date: "2023-10-10",
    action: "Actualización de perfil",
  },
  {
    userId: 3,
    name: "Martin",
    date: "2023-10-15",
    action: "Comentario",
  },
  {
    userId: 2,
    name: "Joaquina",
    date: "2023-10-20",
    action: "Subida de archivo",
  },
  {
    userId: 3,
    name: "Frank",
    date: "2023-10-25",
    action: "Me gusta",
  },
  {
    userId: 1,
    name: "Mary",
    date: "2023-10-30",
    action: "Seguir usuario",
  },
  // Agrega más entradas de historial aquí
];

export default function HistorialUsuarios() {
  const [pdf, setPdf] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Función para filtrar el historial por usuario
  const filteredByUser = userHistoryData.filter((historyItem) =>
    historyItem.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  // Cálculo del total de páginas para la paginación
  const totalPages = Math.ceil(filteredByUser.length / itemsPerPage);

  // Función para obtener la página actual del historial
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredByUser.slice(startIndex, endIndex);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Historial de Usuarios", 10, 10);

    const columns = ["ID", "Usuario", "Fecha", "Acción"];
    const data = getCurrentPageData().map((historyItem) => [
      historyItem.id,
      historyItem.name,
      historyItem.date,
      historyItem.action,
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
      pdf.save("historial_de_usuarios.pdf");
    }
  };

  return (
    <HeadFooter>
      <Box m="8">
        <Heading as="h2" size="lg" mb="4">
          Historial de Usuarios
        </Heading>
        <Flex justify="space-between" alignItems="center" mb="4">
          {/* Agregar una barra de búsqueda por usuario */}
          <Input
            placeholder="Buscar por usuario"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            width="300px"
          />
        </Flex>

        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Fecha</Th>
              <Th>Usuario</Th>
              <Th>Acción</Th>
            </Tr>
          </Thead>
          <Tbody bg="gray.200">
            {getCurrentPageData().map((historyItem) => (
              <Tr key={historyItem.id}>
                <Td>{historyItem.id}</Td>
                <Td>{historyItem.date}</Td>
                <Td>{historyItem.name}</Td>
                <Td>{historyItem.action}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Agregar la paginación */}
        <Flex justify="space-between" mt="4">
          <Button
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
            colorScheme="gray"
            variant='outline'
            leftIcon={<ArrowBackIcon />}
          >
            Anterior
          </Button>
          <Button
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={currentPage === totalPages}
            colorScheme="gray"
            variant='outline'
            rightIcon={<ArrowForwardIcon />} 
          >
            Siguiente
          </Button>
        </Flex>

        <Flex justify="center" mt="4">
          <Button
            // className="bg-blue-900 text-white hover:bg-blue-700"
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
      </Box>
    </HeadFooter>
  );
}