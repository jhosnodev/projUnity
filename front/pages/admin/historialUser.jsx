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
} from "@chakra-ui/react";
import HeadFooter from "../../components/admin/HeadAndFooter";

const userHistoryData = [
  {
    id: 1,
    date: "2023-10-01",
    action: "Registro",
  },
  {
    id: 2,
    date: "2023-10-05",
    action: "Inicio de sesión",
  },
  {
    id: 3,
    date: "2023-10-10",
    action: "Actualización de perfil",
  },
  {
    id: 4,
    date: "2023-10-15",
    action: "Comentario",
  },
  {
    id: 5,
    date: "2023-10-20",
    action: "Subida de archivo",
  },
  {
    id: 6,
    date: "2023-10-25",
    action: "Me gusta",
  },
  {
    id: 7,
    date: "2023-10-30",
    action: "Seguir usuario",
  },
  // Agrega más entradas de historial aquí
];

export default function HistorialUsuarios() {
  return (
    <HeadFooter>
    <Box mb="8" mt="8">
      <Heading as="h2" size="md">
        Historial de Usuarios
      </Heading>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Fecha</Th>
            <Th>Acción</Th>
          </Tr>
        </Thead>
        <Tbody bg="gray.200">
          {userHistoryData.map((historyItem) => (
            <Tr key={historyItem.id} >
              <Td >{historyItem.id}</Td>
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
