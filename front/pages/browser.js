import Head from "next/head";
import React from "react";
import LayoutUser from "../components/layoutUser";
import Loader from "../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { Select, SelectItem, Pagination } from "@nextui-org/react";
import ProjectCard from "../components/ProjectCard";
import { getCategory, getProjects } from "../redux/actions/actions";


export default function Browser() {
  //! Get projects
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectsData.projects);
  const categories = useSelector((state) => state.projectsData.categories);
  const loading = useSelector((state) => state.projectsData.loading);
  console.log(loading);

  React.useEffect(() => {
    dispatch(getProjects());
    dispatch(getCategory());
  }, [dispatch]);
  //!Config de pagination
  const cardPerPage = 12;
  const totalCards = projects.length;
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(totalCards / cardPerPage);
  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  const currenrCard = projects.slice(indexOfFirstCard, indexOfLastCard);
  //!Fin de config de pagination

  //! Filtros
  const handleCategorySelect = (e) => {
    console.log(e.target.innerText);
  };

  const handleFilters = (e) => {
    console.log(e.target.id);
  };
  //! Filtros
if (loading) return <Loader/>
  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | Browser</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="flex">
        {/*!Aside  */}
        <aside className="basis-2/12 bg-background-100 flex  flex-col  items-start p-4">
          <h2>Filters</h2>
          <span
            className="cursor-pointer"
            onClick={() => console.log("press clear")}
          >
            (clear)
          </span>
          <h3 className="mt-3">Category</h3>
          <ul className="pl-3">
            {categories?.map((cat) => (
              <li
                key={cat.id}
                className="cursor-pointer"
                onClick={() => console.log("Cat")}
              >
                {cat.name}
              </li>
            ))}
          </ul>
          <h3 className="mt-3">Price</h3>
          <ul className="pl-3">
            <li
              className="cursor-pointer"
              id="free"
              onClick={(e) => handleFilters(e)}
            >
              ⭐ Free
            </li>
            <li
              className="cursor-pointer"
              id="paid"
              onClick={(e) => handleFilters(e)}
            >
              🛒 Paid
            </li>
            <li
              className="cursor-pointer"
              id="5"
              onClick={(e) => handleFilters(e)}
            >
              🛒 $5 or less
            </li>
            <li
              className="cursor-pointer"
              id="15"
              onClick={(e) => handleFilters(e)}
            >
              🛒 $15 or less
            </li>
          </ul>

          {/*           <h3>Last Update</h3> */}
          <h3 className="mt-3">Tags</h3>
          <ul className="pl-3">
            {projects[0]?.tags.map((tag, index) => (
              <li
                key={index}
                className="cursor-pointer"
                onClick={() => console.log("Cat")}
              >
                {tag}
              </li>
            ))}
          </ul>
        </aside>

        {/* !Main  */}
        <main className="basis-10/12 flex p-4 h-full flex-col justify-center">
          <div className="flex flex-row basis-1/5 align-middle mb-6 ">
            <h1>Treding</h1>
            <Select label="Category" className="w-56 pl-3">
              <SelectItem onPress={(e) => handleCategorySelect(e)}>
                Todos
              </SelectItem>

              {categories?.map((cat) => (
                <SelectItem
                  key={cat.id}
                  value={cat.name}
                  onPress={(e) => handleCategorySelect(e)}
                >
                  {cat.name}
                </SelectItem>
              ))}
            </Select>
            <span className="pt-3  pl-3">({projects.length} results)</span>
          </div>
          <div className="flex flex-col basis-4/5 px-4 justify-center">
            <div className="gap-9 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2">
              {currenrCard.slice(0, 12).map((proj) => (
                <ProjectCard proj={proj} key={proj.id} />
              ))}
            </div>
            <Pagination
              isCompact
              showControls
              total={totalPages}
              initialPage={1}
              className=" mt-6 items-center self-center"
              onChange={setCurrentPage}
              color="primary"
            />
          </div>
        </main>
      </div>
    </LayoutUser>
  );
}
