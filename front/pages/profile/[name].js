import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import LayoutUser from "../../components/layoutUser";

import Head from "next/head";

import ProjDashUser from "../../components/USEDASHBOARD/projDashUser";
import AnalDashUser from "../../components/USEDASHBOARD/analDashUser";
import ButtonCreate from "../../components/USEDASHBOARD/buttonCreateProj";
import ButtonPromotion from "../../components/USEDASHBOARD/buttonPromotion";
import ButtonRequest from "../../components/USEDASHBOARD/buttonRequest";
import Posts from "../../components/USEDASHBOARD/posts";
import Example from "../../components/USEDASHBOARD/chartsViews";
import DownloadCharts from "../../components/USEDASHBOARD/downloadCharts";
import ChartsAnalitycs from "../../components/USEDASHBOARD/chartsAnalitycs";
import FilterAnalitycs from "../../components/USEDASHBOARD/filterAnalitycs";


const Profile = () => {
  const router = useRouter();
  const { name } = router.query;

  // const userName = useSelector((state) => state.usersData.users);
  //   const projects = useSelector((state) => state.projectsData.projectsFilter);
  // console.log(userName);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserByName(name));
  // }, [dispatch]);

  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | {name} </title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div>
        <div className="flex flex-row m-4 ">
          <div className="flex gap-4 items-center m-4 text-black text-4xl font-extrabold">
            <h1>Dashboard</h1>
          </div>
          <div className="flex flex-col float-left justify-center items-center ms-auto mr-20">
            <table class="table-fixed w-96">
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
      </div>
      <div className="ml-8 mr-24 mt-8 mb-8">
        <div className=" flex flex-row justify-start items-center bg-slate-300 h-16 whitespace-pre ">
          <div>
            <h1 className="ml-6 text-black font-bold text-2xl">
              <a href="#projects">Projects</a>
            </h1>
          </div>
          <p className="ml-12 text-black font-bold text-2xl">
            <a href="#analitycs">Analitycs</a>
          </p>
          <p className="ml-12 text-black font-bold text-2xl">
            <a href="#promotions">Promotions</a>
          </p>
          <p className="ml-12 text-black font-bold text-2xl">
            <a href="#requests">Requests</a>
          </p>
          <p className="ml-12 text-black font-bold text-2xl">
            <a href="#posts">Posts</a>
          </p>
        </div>
      </div>
      <div id="projects">
        <h1 className="text-black mt-12 ml-8">Projects</h1>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <ProjDashUser />
            <ProjDashUser />
            <ButtonCreate />
          </div>
          <div className="w-1/3 ml-8">
            <h4 className="text-black">Summary</h4>
            {/* <p>View More</p> */}
            <p className="m-1">Views</p>
            <Example />
            <p className="m-1">Downloads</p>
            <DownloadCharts />
          </div>
        </div>
      </div>
      <div id="analitycs">
        <h1 className="text-black ml-8 mt-12">Analitycs</h1>
        <hr className="w-11/12 border-2 ml-12"></hr>
        <div className="flex flex-col">
         <FilterAnalitycs/>
          <ChartsAnalitycs />
          <AnalDashUser />
        </div>
      </div>
      <div id="promotions">
        <h1 className="text-black ml-8 mt-8">Promotions</h1>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <ProjDashUser />
            <ButtonPromotion />
          </div>
          <div className="w-1/3 ml-8">
            <h4 className="text-black">Summary</h4>
            {/* <p>View More</p> */}
            <p className="m-1">Views</p>
            <Example />
            <p className="m-1">Downloads</p>
            <DownloadCharts />
          </div>
        </div>
      </div>
      <div id="requests">
        <h1 className="text-black ml-8 mt-12">Requests</h1>
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
    </LayoutUser>
  );
};
export default Profile;
