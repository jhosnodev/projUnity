import React from "react";
import Head from "next/head";
import { Box, Flex, Heading, Text, Grid, HStack } from "@chakra-ui/react";
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
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/layout/loader";
import { getUserDashboard } from "../../redux/actions/actionsDashboard";

// const userDashboardData.summaryData = {
//   totalProjects: 368,
//   totalUsers: 500,
//   totalSales: "100",
//   totalRevenue: "$10,000",
//   averageSalesPerUser: "$20.00",
//   activeProjects: 300,
//   averageDailyUsage: "2 horas",
//   tasaDeCrecimientoDeUsuarios: "10%",
// };

// const userData = [
//   {
//     id: 1,
//     name: "Juan Ponce",
//     email: "usuario1@example.com",
//     role: "Miembro",
//     status: "Activo",
//     bio: "UX Designer",
//     projectsCount: 50,
//     earnings: "$5,000",
//   },
//   {
//     id: 2,
//     name: "Maria Perez",
//     email: "usuario2@example.com",
//     role: "Usuario Premium",
//     status: "Bloqueado",
//     bio: "Software Developer",
//     projectsCount: 50,
//     earnings: "$5,000",
//   },
//   // Agrega más usuarios aquí
// ];

const AdminDashboard = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    let sesion = JSON.parse(localStorage.getItem("sesion"));
    if (sesion.id) {
      dispatch(getUserDashboard(sesion.id));
    }
  }, [dispatch]);

  // const id = useSelector((state) => state.usersData.sesion.id);
  // console.log(id);

  // React.useEffect(() => {
  //   if (id) {
  //   dispatch(getUserDashboard(id));
  //   }
  // }, [dispatch, id]);

  const userDashboardData = useSelector(
    (state) => state.userDashboard.userDashboardData
  );
  console.log(userDashboardData);

  const loading = useSelector((state) => state.userDashboard.loading);
  if (loading) return <Loader />;

  return (
    <HeadFooter>
      <Head>
        <title>ProjUnity | Dashboard </title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <main className="bg-background-100 my-0 mx-10 p-6 py-10  flex flex-col">
        {/* SideBar */}
        {/*    <Box>
          <SideBar />
        </Box> */}
        {/* Contenedor principal */}

        <Heading as="h2" size="md" mb="4">
          Dashboard de Administrador
        </Heading>
        {/* Contenedor Flex para la tarjeta y el resumen */}
        <Flex mb="8">
          {/* Tarjeta del Usuario */}
          <UsuarioCard userDashboardData={userDashboardData} />
          {/* Tarjetas de los Estadisticos */}
          <Grid templateColumns="1fr" gap={4} justifyItems="center" ml={6}>
            <Flex alignItems="center">
              <HStack spacing={4}>
                <MetricCard
                  title="Ventas"
                  value={
                    userDashboardData
                      ? userDashboardData.summaryData.totalSales
                      : "no tienes data que mostrar"
                  }
                  icon={<ListAltIcon />}
                />
                <MetricCard
                  title="Ganancias"
                  value={
                    userDashboardData
                      ? userDashboardData.summaryData.totalRevenue
                      : "no tienes data que mostrar"
                  }
                  icon={<MonetizationOnIcon />}
                />
                <MetricCard
                  title="Precio Promedio"
                  value={
                    userDashboardData
                      ? userDashboardData.summaryData.averageSalesPerUser
                      : "XXXXXXXXXXXXXXXXXXXXXXXXXX"
                  }
                  icon={<LocalOfferIcon />}
                />
              </HStack>
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
              <Text fontSize="lg" mb={2}>
                Total de Proyectos:{" "}
                {userDashboardData?.summaryData.totalProjects}
              </Text>
              <Text fontSize="lg" mb={2}>
                Total de Usuarios: {userDashboardData?.summaryData.totalUsers}
              </Text>
              <Text fontSize="lg" mb={2}>
                Promedio de Ventas por usuario:{" "}
                {userDashboardData?.summaryData.averageSalesPerUser}
              </Text>
              <Text fontSize="lg" mb={2}>
                Ventas Totales: {userDashboardData?.summaryData.totalSales}
              </Text>
              <Text fontSize="lg" mb={2}>
                Tiempo promedio de uso diario:{" "}
                {userDashboardData?.summaryData.averageDailyUsage}
              </Text>
            </Box>
          </Grid>
        </Flex>
        {/* Contenedor para los gráficos */}
        <div className=" flex flex-col gap-4">
          <SalesChart userDashboardData={userDashboardData} />
          <TopProjectsChart userDashboardData={userDashboardData} />
          <TopRankedProjectsChart userDashboardData={userDashboardData} />
          <TopSellingUsersChart userDashboardData={userDashboardData} />
        </div>
        <LatestTransactionsTable />
      </main>
    </HeadFooter>
  );
};

export default AdminDashboard;
