import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import LayoutUser from "../../components/layout/layoutUser";
import Loader from "../../components/layout/loader";
import ProjectCardFeed from "../../components/feed/ProjectCardFeed";
import Head from "next/head";

import { getProjects } from "../../redux/actions/actions";
const NuevosProyectos = () => {

const dispatch = useDispatch();
const projects = useSelector((state) => state.projectsData.projects);
    console.log(projects);
    const newProjects = projects.filter(p => p = p.id >= 15)
console.log(newProjects);
useEffect(() => {
  dispatch(getProjects());
}, []);

const loading = useSelector((state) => state.projectsData.loading);
if (loading) return <Loader />;

  return (
    <div>
      <LayoutUser>
        <Head>
          <title>ProjUnity</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <div className="flex flex-col items-center">
          <h1 className="flex-row text-5xl m-8">Nuevos Proyectos</h1>
          <div className="flex-col ml-52">
            {newProjects.map((proj) => <ProjectCardFeed proj={proj} key={proj.id} />)
                         }
          </div>
        </div>
      </LayoutUser>
    </div>
  );
};

export default NuevosProyectos;
