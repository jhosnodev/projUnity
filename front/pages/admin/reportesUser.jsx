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
  // Agrega más entradas de reportes aquí
];

export default function ReportesUsuarios() {
  return (
    <HeadFooter>
    <Box mb="8" mt="8">
      <Heading as="h2" size="md">
        Reportes de Usuarios
      </Heading>
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
