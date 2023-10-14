import React from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
} from "@chakra-ui/react";
import HeadFooter from "../../components/admin/HeadAndFooter";

const userData = [
  {
    id: 1,
    name: "Juan Ponce",
    email: "usuario1@example.com",
    status: "Activo",
  },
  {
    id: 2,
    name: "Francesca Marun",
    email: "usuario2@example.com",
    status: "Bloqueado",
  },
  {
    id: 3,
    name: "Gustavo Dutto",
    email: "usuario2@example.com",
    status: "Activo",
  },
  {
    id: 4,
    name: "Enzo Martinez",
    email: "usuario2@example.com",
    status: "Suspendido",
  },
  {
    id: 5,
    name: "Casilda Marra",
    email: "usuario2@example.com",
    status: "Activo",
  },
  {
    id: 6,
    name: "Mario Grilli",
    email: "usuario6@example.com",
    status: "Inactivo",
  },
  // Agrega más usuarios aquí
];

export default function GestionUsuarios() {
  return (
  <HeadFooter>
    <Box mb="8" mt="8">
      <Flex justify="space-between" mb="4">
        <Heading as="h2" size="md">
          Gestión de Usuarios
        </Heading>
        <Flex>
          <Input placeholder="Buscar usuario" mr="2" />
          <Select placeholder="Filtrar por Estado">
            <option value="activo">Activos</option>
            <option value="bloqueado">Bloqueados</option>
          </Select>
        </Flex>
      </Flex>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Correo Electrónico</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody bg="gray.200">
          {userData.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.status}</Td>
              <Td>
                <Button size="sm" colorScheme="purple">
                  Bloquear
                </Button>
                <Button size="sm" colorScheme="blue" ml="2">
                  Detalles
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
