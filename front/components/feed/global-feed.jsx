import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


import { Image } from "@nextui-org/react";

import IndexFeed from "./IndexFeed";
import Menu from "../feed/Menu";
import ProjectCardFeed from "../feed/ProjectCardFeed";
import LayoutUser from "../layout/layoutUser";
import Loader from "../layout/loader";
import ProjectCard from "../project/ProjectCard";

import { getProjects } from "../../redux/actions/actions";

export default function GlobalFeed() {

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectsData.projects);
  console.log(projects);
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const loading = useSelector((state) => state.projectsData.loading);
  if (loading) return <Loader />;
  
  return (    
      <div>
      <Menu />
        <article className="flex flex-row">
          <div className="flex-col">
            {projects?.slice(0, 4).map((proj) => (
              <ProjectCardFeed proj={proj} key={proj.id} />
            ))}
          </div>
          <aside className="w-5/12 mr-8 flex-col">
            <h1 className="text-black mb-6 ml-4">Últimas Novedades</h1>
            <div className="space-y-4">
              {projects?.slice(5, 8).map((proj) => (
                <ProjectCard proj={proj} key={proj.id} />
              ))}
            </div>
            </aside>
        </article>
      </div>
    
  );
}
