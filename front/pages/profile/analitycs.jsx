import { useSelector } from "react-redux";
import LayoutUser from "../../components/layoutUser";
import Head from "next/head";
import ChartsAnalitycs from "../../components/userDashboard/chartsAnalitycs";
import FilterAnalitycs from "../../components/userDashboard/filterAnalitycs";
import AnalDashUser from "../../components/userDashboard/analDashUser";

const analitycs = () => {
  const sesion = useSelector((state) => state.usersData.sesion);
  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | {sesion.name} </title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div>
        <h1 className="text-black ml-8 mt-12">Estadisticas</h1>
        <hr className="w-11/12 border-2 ml-12"></hr>
        <div className="flex flex-col">
          <FilterAnalitycs />
          <ChartsAnalitycs />
          <AnalDashUser />
        </div>
        <h1>Proyectos mayor rendimiento por promoción</h1>
        <h1>Solicitudes con mayor rendimiento</h1>
      </div>
    </LayoutUser>
  );
};

export default analitycs;
