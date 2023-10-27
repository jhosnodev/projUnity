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
import Loader from "../../components/layout/loader";
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from "../../redux/actions/actions";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";


// const projectData = [
//   {
//     id: 1,
//     name: "Proyecto A",
//     owner: "Usuario 1",
//     status: "Activo",
//   },
//   {
//     id: 2,
//     name: "Proyecto B",
//     owner: "Usuario 2",
//     status: "En pausa",
//   },
//   {
//     id: 3,
//     name: "Proyecto C",
//     owner: "Usuario 3",
//     status: "Activo",
//   },
//   // Agrega más proyectos aquí
// ];

export default function ProjectManagement() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    /* projects.length === 0 && */ dispatch(getProjects());
    // dispatch(getCategory());
  }, [dispatch]);

  const projects = useSelector((state) => state.projectsData.projectsFilter);
  console.log(projects)

  const [searchTerm, setSearchTerm ] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  
  const loading = useSelector((state) => state.projectsData.loading);
  //* Aqui se maneja el loader
  if (loading) return <Loader />;

  const filteredProjects = projects.filter((project) =>
  project.name.toLowerCase().includes(searchTerm.toLowerCase())
);

// Cálculo del total de páginas para la paginación
const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

// Función para obtener los proyectos de la página actual
const getCurrentPageProjects = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredProjects.slice(startIndex, endIndex);
};
  
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
            {getCurrentPageProjects()
            .filter((project) =>
            project.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
            .map((project) => (
              <Tr key={project.id}>
                <Td>{project.id}</Td>
                <Td>{project.name}</Td>
                <Td>
                {project.Users.map((user) => (
                  <Td key={user.id}>{user.githubUser}</Td>

                ))}
                  </Td>
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
      </Box>
    </HeadFooter>
  );
}
