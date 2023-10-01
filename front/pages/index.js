import React from "react";
import ProjectCarousel from "../components/carousel";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";
import LayoutUser from "../components/layoutUser";
import { Button } from "@nextui-org/button";
import { getProjects } from "../redux/actions/actions";
import SolicitudesCard from "../components/SolicitudesCard";
import solicitudes from "../components/solicitudesCom.json";
import { Link } from "@nextui-org/react";

export default function Home({ projects }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <LayoutUser>
      <main className="basis-10/12 flex p-4 h-full flex-col justify-center">
        <ProjectCarousel />
        <div className="flex flex-col basis-4/5 px-4 justify-center">
          <h1>Trending</h1>
          <div className="gap-9 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2">
            {projects.slice(0, 12).map((proj) => (
              <ProjectCard proj={proj} key={proj.id} />
            ))}
          </div>
          <br />
        </div>
        <br />
        <div className="gap-9 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2">
          <h3>Aun no encuentras lo que buscas?</h3>
          <Link to={"/browser"}>
            <Button color="secondary" variant="ghost">
              Todos los proyectos 👀
            </Button>
          </Link>
          <Button color="secondary" variant="ghost" radius="sm">
            Random 🎲
          </Button>
        </div>
        <br />
        <br />
        <div className="flex flex-col basis-4/5 px-4 justify-center">
          <h2>Solicitudes de la Comunidad</h2>
          <div className="gap-9 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2">
            {solicitudes.data.map((solicitud) => (
              <SolicitudesCard key={solicitud.id} solicitud={solicitud} />
            ))}
          </div>
        </div>
      </main>
    </LayoutUser>
  );
}

export async function getServerSideProps() {
  const projectsRequest = await fetch("http://localhost:3000/api/projects");
  const categoriesRequest = await fetch("http://localhost:3000/api/categories");
  const [{ data: projects }, { data: categories }] = await Promise.all([
    projectsRequest.json(),
    categoriesRequest.json(),
  ]);

  return {
    props: {
      projects,
      categories,
    },
  };
}
