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
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../components/layout/loader";
import { getUserDashboard } from "../../redux/actions/actionsDashboard";



// const userDashboardData = {
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

  const id = useSelector((state) => state.usersData.sesion.id);
  console.log(id);

    const userDashboardData = useSelector((state) => state.userDashboard.userDashboardData);
    console.log(userDashboardData);
   

    React.useEffect(() => {
      dispatch(getUserDashboard(id));
    }, [dispatch, id]);

    // if (!userDashboardData) {
    //   return <Loader />;
    // }

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
