import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import IndexFeed from "../../components/feed/IndexFeed";
import LayoutUser from "../../components/layout/layoutUser";
import Head from "next/head";

import Loader from "../../components/layout/loader";
import GlobalFeed from "../../components/feed/global-feed";

import { getProjects } from "../../redux/actions/actions";
const Feed = () => {
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
      <LayoutUser>
        <Head>
          <title>ProjUnity</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <main className="py-4 px-10">
        {projects ? <IndexFeed /> : <p>Intente nuevamente mas tarde</p>}

        </main>
      </LayoutUser>
    </div>
  );
};

export default Feed;

{
}
