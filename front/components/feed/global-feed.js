import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Image } from "@nextui-org/react";

import IndexFeed from "./IndexFeed";
import Menu from "./Menu";
import ProjectCardFeed from "./ProjectCardFeed";
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
  }, [dispatch]);

  const loading = useSelector((state) => state.projectsData.loading);
  if (loading) return <Loader />;

  return (
    <div>
      <Menu />
      <div className="flex flex-row gap-12">
        <div className="flex flex-col w-9/12">
          {projects?.slice(0, 4).map((proj) => (
            <ProjectCardFeed proj={proj} key={proj.id} />
          ))}
        </div>
        <aside className="flex flex-col w-3/12">
          <h2 className="text-primary mb-6">Últimas Novedades</h2>

          {projects?.slice(5, 8).map((proj) => (
            <ProjectCard proj={proj} key={proj.id} />
          ))}
        </aside>
      </div>
    </div>
  );
}
