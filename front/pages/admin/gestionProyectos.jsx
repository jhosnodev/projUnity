import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Input,
  Link
} from "@chakra-ui/react";
import HeadFooter from "../../components/admin/HeadAndFooter";

const projectData = [
  {
    id: 1,
    name: "Proyecto A",
    owner: "Usuario 1",
    status: "Activo",
  },
  {
    id: 2,
    name: "Proyecto B",
    owner: "Usuario 2",
    status: "En pausa",
  },
  {
    id: 3,
    name: "Proyecto C",
    owner: "Usuario 3",
    status: "Activo",
  },
  // Agrega más proyectos aquí
];

export default function ProjectManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projectData.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <HeadFooter>
      <Box m="6">
        <Heading as="h2" size="lg" mb="4">
          Gestión de Proyectos
        </Heading>
        <Flex justify="center" mb="4">
          <Input
            placeholder="Buscar proyecto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            width="300px"
            mr="4"
          />
          <Button colorScheme="purple">Buscar</Button>
        </Flex>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre del Proyecto</Th>
              <Th>Propietario</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody bg="gray.200">
            {filteredProjects.map((project) => (
              <Tr key={project.id}>
                <Td>{project.id}</Td>
                <Td>{project.name}</Td>
                <Td>{project.owner}</Td>
                <Td>{project.status}</Td>
                <Td>
                  <Link href="/admin/historialUser">
                  <Button colorScheme="blue" size="sm" mr="2">
                    Historial
                  </Button>
                  </Link>
                  <Link href="/admin/reportesUser">
                  <Button colorScheme="blue" size="sm" mr="2">
                    Reportes
                  </Button>
                  </Link>
                  <Button colorScheme="red" size="sm">
                    Eliminar
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
