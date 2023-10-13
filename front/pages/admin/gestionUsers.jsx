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
    role: "Miembro",
    status: "Activo",
  },
  {
    id: 2,
    name: "Maria Perez",
    email: "usuario2@example.com",
    role: "Usuario Premium",
    status: "Bloqueado",
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
          <Select placeholder="Filtrar por rol">
            <option value="miembros">Miembros</option>
            <option value="premium">Usuarios Premium</option>
          </Select>
        </Flex>
      </Flex>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Correo Electrónico</Th>
            <Th>Rol</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userData.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Badge
                  colorScheme={user.role === "Miembro" ? "blue" : "green"}
                >
                  {user.role}
                </Badge>
              </Td>
              <Td>{user.status}</Td>
              <Td>
                <Button size="sm" colorScheme="red">
                  Bloquear
                </Button>
                <Button size="sm" colorScheme="teal" ml="2">
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
