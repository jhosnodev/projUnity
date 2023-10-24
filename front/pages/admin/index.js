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
        <title>ProjUnity | Dashboard </title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <main className="mx-10 p-6 bg-background-100 flex-col">
        {/* SideBar */}
        {/*   <Box>
          <SideBar />
        </Box> */}
        {/* Contenedor principal */}

        <Heading as="h2" size="md" mb="4">
          Dashboard de Administrador
        </Heading>
        {/* Contenedor Flex para la tarjeta y el resumen */}
        <div className=" w-full flex flex-row my-10 justify-between gap-6">
          {/* Tarjeta del Usuario */}
          <UsuarioCard />
          {/* Tarjetas de los Estadisticos */}
          <div className="grid grid-cols-3 grid-rows-2 gap-6 w-8/12">
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

            {/* Resumen del Dashboard */}
            <div className="bg-white rounded-md p-6 drop-shadow col-span-3">
              <h3 className="text-primary text-center">Resumen</h3>
              <p>
                <b>Total de Proyectos: </b>
                {summaryData.totalProjects}
              </p>
              <p>
                <b>Total de Usuarios: </b>
                {summaryData.totalUsers}
              </p>
              <p>
                <b>Proyectos Activos: </b>
                {summaryData.activeProjects}
              </p>
              <p>
                <b>Tasa de Crecimiento de Usuarios: </b>
                {summaryData.tasaDeCrecimientoDeUsuarios}
              </p>
              <p>
                <b>Tiempo promedio de uso diario: </b>
                {summaryData.averageDailyUsage}
              </p>
            </div>
          </div>
        </div>
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
      </main>
    </HeadFooter>
  );
};

export default AdminDashboard;
