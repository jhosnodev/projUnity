import { useRouter } from "next/router";
// import ButtonEdit from "../../components/userDashboard/buttonEdit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import LayoutUser from "../../components/layout/layoutUser";
import Loader from "../../components/layout/loader";

import Head from "next/head";

// import ProjDashUser from "../../components/userDashboard/projDashUser";
// import ButtonCreate from "../../components/userDashboard/buttonCreateProj";
// import ButtonPromotion from "../../components/userDashboard/buttonPromotion";
// import ButtonRequest from "../../components/userDashboard/buttonRequest";
// import Posts from "../../components/userDashboard/posts";
// import Example from "../../components/userDashboard/chartsViews";
// import DownloadCharts from "../../components/userDashboard/downloadCharts";
import OrdenesCompra from "../../components/userDashboard/OrdenesCompra";
import { getSesion } from "../../redux/actions/actionsUser";
import { getProjects, deleteProjects } from "../../redux/actions/actions";
// import { getOrder } from "../../redux/actions/actionsPayments";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Link,
  Image,
} from "@nextui-org/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Analitycs from "../../components/userDashboard/analitycs";
import Buttons from "../../components/userDashboard/Buttons";
import ProyectosDesactivos from "../../components/userDashboard/ProyectosDesactivos";


const Profile = () => {
  // const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSesion());
    dispatch(getProjects());
  }, [dispatch]);

  const sesion = useSelector((state) => state.usersData.sesion);
   const projects = useSelector((state) => state.projectsData.projects);
  
  const projectsByUser = projects?.filter((p) => Number(p.Users[0]?.id) === 2); //aca va sesion.id
console.log(projectsByUser);

  const viewsByProject = projectsByUser?.map((p) => {
    return {
      name: p.name,
      views: p.views ? (
        p.views
      ) : (
        <p>No se encuentran vistas para este proyecto</p>
      ),
    };
  });
  console.log(viewsByProject);

  const totalViews = viewsByProject.reduce(
    (total, item) => total + item.views,
    0
  );

  const ratingByProject = projectsByUser?.map((p) => {
    return {
      name: p.name,
      rating: p.Ratings[0]?.score ? (
        p.Ratings[0]?.score
      ) : (
        <p>Este proyecto no se encuentra rankeado</p>
      ),
    };
  });
  
  if (!sesion?.id) return <Loader />;

  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | {sesion?.name} </title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <main className="mx-10 bg-background-100 py-10 px-4">
        <div className="flex flex-row  ">
          <div className="flex gap-4 items-center m-4 text-black text-4xl font-extrabold">
            <h2 className="text-primary">Panel de {sesion?.name}</h2>
          </div>
          <div className="flex flex-col float-left justify-center items-center ms-auto mr-20">
            <table className="table-fixed w-96">
              <tbody className="text-black text-xl font-extrabold text-center">
                <tr>
                  <th>Views</th>
                  {/* <th>Downloads</th>
                  <th>Followers</th> */}
                </tr>
              </tbody>
              <thead className="text-black text-lg font-medium text-center">
                <tr>
                  <td>{totalViews}</td>
                  {/* <td>45</td>
                  <td>12</td> */}
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
            <a href="#analitycs">Estadísticas</a>
          </p>
          {/* <p className="ml-12 text-black font-bold text-2xl">
            <a href="#requests">Solicitudes</a>
          </p> */}
          {/* <p className="ml-12 text-black font-bold text-2xl">
            <a href="#posts">Posts</a>
          </p> */}
          {/* <p className="ml-12 text-black font-bold text-2xl">
            <a href="#compras">Historial de Compras</a>
          </p> */}
        </div>

        <div id="projects">
          <h1 className="text-black mt-12 ml-8">Proyectos</h1>
          {/* <ProjDashUser id={sesion.id } /> */}
          <div className="flex flex-row ">
            <div className="flex flex-col w-7/12">
              {projectsByUser.map((proj) => (
                <div className="flex flex-row m-4" key={proj.id}>
                  <div className="ml-4 h-32 w-32 border-slate-300 border-3">
                    <Image
                      src={proj.image}
                      alt={proj.name}
                      radius="none"
                      className="w-44 h-28 mt-1 mb-1"
                      // object-fit="cover"
                    />
                  </div>
                  <div className="flex flex-col items-center bg-white border-slate-300 border-3 w-9/12">
                    <h1 className="text-black mb-4">{proj.name}</h1>
                    <div className="flex flex-col justify-end">
                      <div className="flex flex-row ">
                        {/* buton edit */}
                        <div>
                          <Button
                            onPress={onOpen}
                            className="ml-4 mb-4 mr-8 rounded-none text-lg font-bold bg-indigo-800 text-white"
                          >
                            Editar
                          </Button>
                          <Modal
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            className="indigo-light"
                          >
                            <ModalContent>
                              {(onClose) => (
                                <>
                                  <ModalHeader className="flex flex-col gap-1">
                                    ¿Quieres editar este proyecto?
                                  </ModalHeader>

                                  <ModalFooter>
                                    <Button
                                      color="danger"
                                      variant="light"
                                      onPress={onClose}
                                    >
                                      Cerrar
                                    </Button>
                                    <Link href={`/project/edit/${proj.id}`}>
                                      <Button color="primary">Editar</Button>
                                    </Link>
                                  </ModalFooter>
                                </>
                              )}
                            </ModalContent>
                          </Modal>
                        </div>
                        <div>
                          <Buttons id={proj.id} />
                          {/* <Link href="/profile/analitycs">
                            <Button className="ml-4 mb-4 mr-4 rounded-none text-lg font-bold bg-indigo-800 text-white w-44">
                              Estadisticas
                            </Button>
                          </Link> */}
                          {/* <Button
                            className="mb-4 mr-8 bg-orange-600 rounded-none text-lg font-bold "
                            color="primary"
                          > */}
                          {/* {active ? "Activar" : "Desactivar"} */}
                          {/* Activar
                          </Button>
                          <Button
                            onPress={handleDelete(`${proj.id}`)}
                            className="mb-4 mr-8 bg-orange-600 rounded-none text-lg font-bold "
                            color="primary"
                          >
                            {active ? "Activar" : "Desactivar"} */}
                          {/* Desactivar
                          </Button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Link href="/project/create">
                <Button className="ml-8 w-56 h-16 rounded-none text-lg bg-blue-950 text-white">
                  Crear un nuevo proyecto
                </Button>
              </Link>
               {/* <ProyectosDesactivos/> */}
            </div>
            <div className="w-1/3 ml-8">
              <h4 className="text-black">Summary</h4>

              {/* GRAFICO DE VISTAS */}
              <p className="m-1">Vistas</p>

              <div style={{ width: "100%" }}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    width={150}
                    height={40}
                    data={viewsByProject}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      connectNulls
                      type="monotone"
                      dataKey="views"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* GRAFICO DE RATING */}
              <p className="m-1">Rating</p>
              <div style={{ width: "100%" }}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    width={150}
                    height={40}
                    data={ratingByProject}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      connectNulls
                      type="monotone"
                      dataKey="rating"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div id="analitycs">
          <Analitycs proj={projectsByUser} />
        </div>
        {/*  

        <div id="promotions">
          <h1 className="text-black ml-8 mt-8">Promociones</h1>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <ProjDashUser />
              <ButtonPromotion />
            </div>
            <div className="w-1/3 ml-8">
              <h4 className="text-black">Summary</h4>
               <p>View More</p>
              <p className="m-1">Vistas</p>
              <Example />
              <p className="m-1">Descargas</p>
              <DownloadCharts />
            </div>
          </div>
        </div>  */}
        {/* <div id="requests">
          <h1 className="text-black ml-8 mt-12">Solicitudes</h1>
          <div className="flex flex-row">
            <ProjDashUser />
            <ProjDashUser />
          </div>
          <ButtonRequest />
        </div> */}
        {/* <div id="posts">
          <h1 className="text-black ml-8 mt-12">Posts</h1>
          <Posts />
        </div> */}
        {/* <div id="compras">
          <h1 className="text-black ml-8 mt-12">Historial de compras</h1>
          <OrdenesCompra name={sesion.name} projects={projects} />
        </div> */}
      </main>
    </LayoutUser>
  );
};
export default Profile;

/*   const [sesionProfile, setSesionProfile ] = useState({})
  sesion?.id && setSesionProfile({...sesion}) */

  // const userName = useSelector((state) => state.usersData.users);
  //   const projects = useSelector((state) => state.projectsData.projectsFilter);
  // console.log(userName);
  // const dispatch = useDispatch();

  // const loading = useSelector((state) => state.usersData.loading);
  //* Aqui se maneja el loader


