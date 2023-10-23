import React from "react";
import Head from "next/head";
import { Box, Flex, Heading, Text, Grid } from "@chakra-ui/react";
import HeadFooter from "../../components/admin/HeadAndFooter";
import UsuarioCard from "../../components/admin/usuarioCard";
import SideBar from "../../components/admin/sideBarAdmin";
import MetricCard from "../../components/admin/metricCard";
import SalesChart from "../../components/admin/salesChart";
import TopProjectsChart from "../../components/admin/topProjectsChart";
import TopRankedProjectsChart from "../../components/admin/topRankedProjectsChart";
import TopSellingUsersChart from "../../components/admin/topSellingUsersChart";
import LatestTransactionsTable from "../../components/admin/ultimasTransacciones";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const summaryData = {
  totalProjects: 368,
  totalUsers: 500,
  totalSales: "100",
  totalRevenue: "$10,000",
  averageSalesPerUser: "$20.00",
  activeProjects: 300,
  averageDailyUsage: "2 horas",
  tasaDeCrecimientoDeUsuarios: "10%",
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
        <Box>
          <SideBar />
        </Box>
        {/* Contenedor principal */}
        <Box m="6">
          <Heading as="h1" size="md" mb="4">
            Dashboard de Administrador
          </Heading>
          {/* Contenedor Flex para la tarjeta y el resumen */}
          <Flex mb="8">
            {/* Tarjeta del Usuario */}
            <UsuarioCard />
            {/* Tarjetas de los Estadisticos */}
            <Grid>
              <Flex ml="4">
                <MetricCard
                  title="Ventas"
                  value={summaryData.totalSales}
                  icon={<ListAltIcon />}
                />
                <MetricCard
                  title="Ganancias"
                  value={userData[0].earnings}
                  icon={<MonetizationOnIcon />}
                />
                <MetricCard
                  title="Precio Promedio"
                  value={summaryData.averageSalesPerUser}
                  icon={<LocalOfferIcon />}
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
                  Proyectos Activos: {summaryData.activeProjects}
                </Text>
                <Text fontSize="lg">
                  Tasa de Crecimiento de Usuarios:{" "}
                  {summaryData.tasaDeCrecimientoDeUsuarios}
                </Text>
                <Text fontSize="lg">
                  Tiempo promedio de uso diario: {summaryData.averageDailyUsage}
                </Text>
              </Box>
            </Grid>
          </Flex>
          {/* Contenedor para los gráficos */}
          <Grid>
            <Box mb="6">
              <SalesChart />
            </Box>
            <Box mb="6">
              {" "}
              <TopProjectsChart />
            </Box>
            <Box mb="6">
              {" "}
              <TopRankedProjectsChart />
            </Box>
            <TopSellingUsersChart />
          </Grid>
          <LatestTransactionsTable />
        </Box>
      </Flex>
    </HeadFooter>
  );
};

export default AdminDashboard;
