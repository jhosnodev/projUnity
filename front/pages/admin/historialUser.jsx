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
} from "@chakra-ui/react";
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
  const [selectedUser, setSelectedUser] = useState(1); // Usuario seleccionado
  const [pdf, setPdf] = useState(null);

  // Función para filtrar el historial del usuario seleccionado
  const filteredHistory = userHistoryData.filter(
    (historyItem) => historyItem.userId === selectedUser
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Historial de ${userHistoryData[selectedUser - 1].name}`, 10, 10);

    const columns = ["ID", "Fecha", "Acción"];
    const data = filteredHistory.map((historyItem) => [
      historyItem.id,
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
      pdf.save(`historial_de_${userHistoryData[selectedUser - 1].name}.pdf`);
    }
  };

  return (
    <HeadFooter>
      <Box mb="8" mt="8">
        <Heading as="h2" size="md">
          Historial de Usuarios
        </Heading>
        <Flex justify="center">
          {/* Agrega un selector para elegir un usuario */}
          <Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(Number(e.target.value))}
            width="400px"
            mr="4"
          >
            {userHistoryData.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.name}
              </option>
            ))}
          </Select>

          <Button
            colorScheme="purple"
            size="sm"
            onClick={generatePDF}
            ml="4"
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
              <Th>Acción</Th>
            </Tr>
          </Thead>
          <Tbody bg="gray.200">
            {filteredHistory.map((historyItem) => (
              <Tr key={historyItem.id}>
                <Td>{historyItem.id}</Td>
                <Td>{historyItem.date}</Td>
                <Td>{historyItem.action}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </HeadFooter>
  );
}
