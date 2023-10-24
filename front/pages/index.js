import React from "react";
import ProjectCarousel from "../components/layout/carousel";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../components/project/ProjectCard";
import LayoutUser from "../components/layout/layoutUser";
import { Button } from "@nextui-org/button";
import { getProjects } from "../redux/actions/actions";
import SolicitudesCard from "../components/SolicitudesCard";
import solicitudes from "../components/solicitudesCom.json";
import { Link } from "@nextui-org/react";
import Loader from "../components/layout/loader";
import Head from "next/head";

export default function Home({}) {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projectsData.projectsFilter);
  React.useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const loading = useSelector((state) => state.projectsData.loading);
  //* Aqui se maneja el loader
  if (loading) return <Loader />;
  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | Home</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <ProjectCarousel />
      <main className="basis-10/12 flex  h-full flex-col justify-center p-6">
        <div className="flex flex-col basis-4/5 px-4 justify-center">
          <h1 className="pb-2">Tendencias</h1>
          <div className="gap-9 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2">
            {projects?.slice(0, 12).map((proj) => (
              <ProjectCard proj={proj} key={proj.id} />
            ))}
          </div>

          <div className="gap-9 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 p-4 justify-center content-center items-center mt-4">
            <h3>Aun no encuentras lo que buscas?</h3>
            <Link href={"/browser"}>
              <Button color="primary" variant="shadow">
                Todos los proyectos 👀
              </Button>
            </Link>
            <Link href="/project/detail/11">
              <Button color="primary" variant="ghost" radius="sm">
                Random 🎲
              </Button>
            </Link>
          </div>
        </div>
        <div className="my-9 mx-4">
          <Link href="/community" className="mb-4">
          <h1 className="pb-2">Solicitudes de la comunidad</h1>
          </Link>
          <div className="gap-6 flex flex-row  w-full">
            {solicitudes.data.map((solicitud) => (
              <SolicitudesCard key={solicitud.id} solicitud={solicitud} />
            ))}
          </div>
        </div>
      </main>
    </LayoutUser>
  );
}
