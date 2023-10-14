//Necesito ruta que traiga los proyectos creados por el usuario - Actual// uso getProyects
//el precio en el projectCard me parece que no seria importante ya que en el detail aparece
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserId } from "../../redux/actions/actionsUser";

import LayoutUser from "../../components/layout/layoutUser";
import ProjectCardUser from "../../components/ProjectCardUser";
import ButtonFollow from "../../components/buttonFollow";
import ButtonReport from "../../components/buttonReport";
import SocialMedia from "../../components/socialMedia";
import RecentActUser from "../../components/recentActUser";

import Head from "next/head";
import {Avatar, Button} from "@nextui-org/react";


import { getProjects } from "../../redux/actions/actions";

const Profile = () => {

   const router = useRouter();
   const id = router.query.id;
  const userId = useSelector((state) => state.usersData.userId)
  const projects = useSelector((state) => state.projectsData.projectsFilter);
  console.log(projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserId(id))
    dispatch(getProjects())
  }, [dispatch, id]);

  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | {userId.name}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div>
        <div className="flex flex-row m-4 ">
          <div className="flex gap-4 items-center m-4 text-black text-4xl font-extrabold">
            <Avatar
              src={userId.avatar}
              isBordered
              className="w-32 h-32 text-xlarge"
              size="lg"
            />
            {userId.name}
          </div>
          <div className="flex flex-col float-left justify-center items-center ms-auto mr-20">
            <table class="table-fixed w-96">
              <tbody className="text-black text-xl font-extrabold text-center">
                <tr>
                  <th>Post</th>
                  <th>Followers</th>
                  <th>Following</th>
                </tr>
              </tbody>
              <thead className="text-black text-lg font-medium text-center">
                <tr>
                  <td>7</td>
                  <td>45</td>
                  <td>1</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="flex flex-row text-black ml-12">
          Usuario desde {userId.creationAt}
          <div className="flex  float-left justify-center items-center  ms-auto mr-28">
            <ButtonFollow name={userId.name} />
            <ButtonReport name={userId.name} />
          </div>
        </div>
        <div>
          <SocialMedia email={userId.email} />
        </div>

        <div className="ml-12 mt-4 mb-8 text-black ">
          TOP 3 HR Influencers Spain ✪ FORBES Successful Entrepreneurs ✪
          Co-Fundador ✪ Best Selling Author ✪ Mentor Marca Personal y Búsqueda
          de Empleo ✪ Ayudo a líderes a reclutar mejor con DATA ✪
          Tech-Blockchain-AI-Consultant
        </div>
        <div className="ml-12 mb-8 text-4xl font-extrabold">
          <h1 className="mb-4  text-4xl font-extrabold">Proyectos</h1>

          <div className="gap-9 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 m-1">
            {projects.slice(0, 5).map((proj) => (
              <ProjectCardUser proj={proj} key={proj.id} />
            ))}
          </div>
        </div>
        
        <div className="ml-12">
          <h1 className="mb-4 mt-8 text-4xl font-extrabold">
            Actividades recientes
          </h1>
          {projects.slice(0, 2).map((proj) => (
            <RecentActUser
              name={userId.name}
              projName={proj.name}
              projDes={proj.description}
              key={proj.id}
            />
          ))}
        </div>
      </div>
    </LayoutUser>
  );
};

export default Profile;
