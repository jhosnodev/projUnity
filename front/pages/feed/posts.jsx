import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import LayoutUser from "../../components/layout/layoutUser";
import Loader from "../../components/layout/loader";
import ProjectCardFeed from "../../components/feed/ProjectCardFeed";
import Head from "next/head";

import { getProjects } from "../../redux/actions/actions";
import Comments from "../../components/feed/CommentsFeed";

const Posts = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectsData.projects);
  console.log(projects);
  const newProjects = projects.filter((p) => (p = p.id >= 15));
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
          <h1 className="flex-row text-5xl m-8">Ultimos Comentarios</h1>
          <div className="flex flex-row m-16">
            {/* {newProjects.map((proj) => (
              <ProjectCardFeed proj={proj} key={proj.id} />
            ))} */}
            <Comments />
            <Comments />
          </div>
        </div>
 </LayoutUser>
    </div>
  );
};

export default Posts;
