import LayoutUser from "../layout/layoutUser.js";
import Head from "next/head";
import ChartsAnalitycs from "./chartsAnalitycs.jsx";
import FilterAnalitycs from "./filterAnalitycs.jsx";
import AnalDashUser from "./analDashUser.jsx";
import { useSelector } from "react-redux";

const Analitycs = ({ proj }) => {
  console.log(proj);
  // const sesion = useSelector((state) => state.usersData.sesion);
  // console.log(sesion);
  return (
    <div>
      <h1 className="text-black ml-8 mt-12">Estadisticas</h1>
      <hr className="w-11/12 border-2 ml-12"></hr>
      <div className="flex flex-col">
        {/* <FilterAnalitycs /> */}
        <ChartsAnalitycs proj={proj} />
        <AnalDashUser proj={proj} />
      </div>
      {/* <h1>Proyectos mayor rendimiento por promoción</h1>
      <h1>Solicitudes con mayor rendimiento</h1> */}
    </div>
  );
};

export default Analitycs;
