import React from "react";
import Head from "next/head";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Badge,
  Grid,
} from "@chakra-ui/react";
import HeadFooter from "../components/admin/HeadAndFooter";
import UsuarioCard from "../components/admin/usuarioCard";
import SideBar from "../components/admin/sideBarAdmin";
import MetricCard from "../components/admin/metricCard";
import SalesChart from "../components/admin/salesChart";
import TopProjectsChart from "../components/admin/topProjectsChart";
import TopRankedProjectsChart from "../components/admin/topRankedProjectsChart";
import TopSellingUsersChart from "../components/admin/topSellingUsersChart";
import LatestTransactionsTable from "../components/admin/ultimasTransacciones";

const summaryData = {
  totalProjects: 125,
  totalUsers: 500,
  activeSubscriptions: 75,
  totalSales: "$10,000",
  totalRevenue: "$10,000",
  averageSalesPerUser: "$20.00",
  activeProjects: 30,
  averageDailyUsage: "2 horas",
  monthlyRecurringRevenue: "$5,000",
};

const userData = [
  {
    id: 1,
    name: "Juan Ponce",
    email: "usuario1@example.com",
    role: "Miembro",
    status: "Activo",
    bio: "UX Designer",
    projectsCount: 50,
    earnings: "$5,000",
  },
  {
    id: 2,
    name: "Maria Perez",
    email: "usuario2@example.com",
    role: "Usuario Premium",
    status: "Bloqueado",
    bio: "Software Developer",
    projectsCount: 50,
    earnings: "$5,000",
  },
  // Agrega más usuarios aquí
];

const AdminDashboard = () => {
  return (
    <HeadFooter>
      <Head>
        <title>ProjUnity | Dashboard del Admnistrador</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Flex>
        {/* SideBar */}
        <Box w="250px" bg="gray.100" p="4">
          <Heading as="h2" size="sm" mb="4">
            MENÚ
          </Heading>
          <SideBar />
        </Box>
        {/* Contenedor principal */}
        <Box flex="1" p="4">
          <Heading as="h1" size="md" mb="4">
            Dashboard de Administrador
          </Heading>
          {/* Contenedor Flex para la tarjeta y el resumen */}
          <Flex mb="8">
            {/* Tarjeta del Usuario */}
            <UsuarioCard />
            {/* Tarjetas de los Estadisticos */}
            <Grid>
              <Flex>
                <MetricCard
                  title="Ventas"
                  value={summaryData.totalSales}
                  icon="📶"
                />
                <MetricCard
                  title="Ganancias"
                  value={userData[0].earnings}
                  icon="💲"
                />
                <MetricCard
                  title="Suscripciones Activas"
                  value={summaryData.activeSubscriptions}
                  icon="🔔"
                />
              </Flex>
              {/* Resumen del Dashboard */}
              <Box
                flex="1"
                p="4"
                bg="white"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                rounded="lg"
                width="80%"
                maxWidth="400px"
                margin="0 auto"
              >
                <Heading
                  as="h2"
                  size="md"
                  mb="2"
                  color="customDarkPurple"
                  textAlign="center"
                >
                  Resumen
                </Heading>
                <Text fontSize="lg">
                  Total de Proyectos: {summaryData.totalProjects}
                </Text>
                <Text fontSize="lg">
                  Total de Usuarios: {summaryData.totalUsers}
                </Text>
                <Text fontSize="lg">
                  Promedio de Ventas por usuario:{" "}
                  {summaryData.averageSalesPerUser}
                </Text>
                <Text fontSize="lg">
                  Ventas Totales: {summaryData.totalSales}
                </Text>
                <Text fontSize="lg">
                  Tiempo promedio de uso diario: {summaryData.averageDailyUsage}
                </Text>
              </Box>
            </Grid>
          </Flex>
          {/* Contenedor para los gráficos */}
          <Box>
            <Box mb="4">
            <SalesChart />
            </Box>
            <Box mb="4">
              {" "}
              <TopProjectsChart />
            </Box>
            <Box mb="4">
              {" "}
              <TopRankedProjectsChart />
            </Box>
            <TopSellingUsersChart />
          </Box>
          <LatestTransactionsTable />
          {/* Gestión de Usuarios */}
          {/* <Box mb="8" mt="8">
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
          </Box> */}
        </Box>
      </Flex>
    </HeadFooter>
  );
};

export default AdminDashboard;
