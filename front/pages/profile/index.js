import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import LayoutUser from "../../components/layout/layoutUser";

import Head from "next/head";

import ProjDashUser from "../../components/userDashboard/projDashUser";
import ButtonCreate from "../../components/userDashboard/buttonCreateProj";
import ButtonPromotion from "../../components/userDashboard/buttonPromotion";
import ButtonRequest from "../../components/userDashboard/buttonRequest";
import Posts from "../../components/userDashboard/posts";
import Example from "../../components/userDashboard/chartsViews";
import DownloadCharts from "../../components/userDashboard/downloadCharts";
import OrdenesCompra from "../../components/userDashboard/OrdenesCompra";
import { getProjects } from "../../redux/actions/actions";

const Profile = () => {
   const dispatch = useDispatch();
  const sesion = useSelector((state) => state.usersData.sesion);
  console.log(sesion);
  // const { id } = sesion
  // console.log(id);

 const projects = useSelector((state) => state.projectsData.projectsFilter);
 const projectsByUser = projects.filter(
   (p) => Number(p.Users[0]?.id) === 1);
  console.log(projectsByUser);

 useEffect(() => {
   dispatch(getProjects());
   
 }, [dispatch]);

  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | {sesion.name} </title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <main className="mx-10 bg-background-100 py-10 px-4">

    
    
        <div className="flex flex-row  ">
          <div className="flex gap-4 items-center m-4 text-black text-4xl font-extrabold">
            <h2 className="text-primary">Panel de {sesion.name}</h2>
          </div>
          <div className="flex flex-col float-left justify-center items-center ms-auto mr-20">
            <table className="table-fixed w-96">
              <tbody className="text-black text-xl font-extrabold text-center">
                <tr>
                  <th>Views</th>
                  <th>Downloads</th>
                  <th>Followers</th>
                </tr>
              </tbody>
              <thead className="text-black text-lg font-medium text-center">
                <tr>
                  <td>7</td>
                  <td>45</td>
                  <td>12</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
   
     
        <div className=" flex flex-row justify-start items-center bg-slate-300 h-16 whitespace-pre ">
          <div>
            <h1 className="ml-6 text-black font-bold text-2xl">
              <a href="#projects">Proyectos</a>
            </h1>
          </div>
          <p className="ml-12 text-black font-bold text-2xl">
            <a href="#promotions">Promociones</a>
          </p>
          <p className="ml-12 text-black font-bold text-2xl">
            <a href="#requests">Solicitudes</a>
          </p>
          <p className="ml-12 text-black font-bold text-2xl">
            <a href="#posts">Posts</a>
          </p>
          <p className="ml-12 text-black font-bold text-2xl">
            <a href="#compras">Historial de Compras</a>
          </p>
        </div>
    
      <div id="projects">
        <h1 className="text-black mt-12 ml-8">Proyectos</h1>
        <div className="flex flex-row">
          <div className="flex flex-col">
            {/* {projectsByUser?.map((proj) => (
              <ProjDashUser proj={proj} key={proj.id} />
            ))} */}
          </div>
          <div className="w-1/3 ml-8">
            <h4 className="text-black">Summary</h4>
            {/* <p>View More</p> */}
            <p className="m-1">Vistas</p>
            {projectsByUser?.map((proj) => (
              <Example views={proj} key={proj.id} />
            ))} 
            
            <p className="m-1">Descargas</p>
            <DownloadCharts />
          </div>
        </div>
      </div>

      <div id="promotions">
        <h1 className="text-black ml-8 mt-8">Promociones</h1>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <ProjDashUser />
            <ButtonPromotion />
          </div>
          <div className="w-1/3 ml-8">
            <h4 className="text-black">Summary</h4>
            {/* <p>View More</p> */}
            <p className="m-1">Vistas</p>
            <Example />
            <p className="m-1">Descargas</p>
            <DownloadCharts />
          </div>
        </div>
      </div>
      <div id="requests">
        <h1 className="text-black ml-8 mt-12">Solicitudes</h1>
        <div className="flex flex-row">
          <ProjDashUser />
          <ProjDashUser />
        </div>
        <ButtonRequest />
      </div>
      <div id="posts">
        <h1 className="text-black ml-8 mt-12">Posts</h1>
        <Posts />
      </div>
      <div id="compras">
        <h1 className="text-black ml-8 mt-12">Historial de compras</h1>
        <OrdenesCompra />
      </div>
      </main>
    </LayoutUser>
  );
};
export default Profile;
