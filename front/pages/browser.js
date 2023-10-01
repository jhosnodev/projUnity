import Head from "next/head";
import React, { useState } from "react";
import LayoutUser from "../components/layoutUser";
import Loader from "../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { Select, SelectItem, Pagination, Chip } from "@nextui-org/react";
import ProjectCard from "../components/ProjectCard";

import { getCategory, getProjects, filters } from "../redux/actions/actions";

export default function Browser() {
  //! Get projects
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectsData.projectsFilter);
  /*   const allprojects = useSelector((state) => state.projectsData.projects); */
  const categories = useSelector((state) => state.projectsData.categories);

  const loading = useSelector((state) => state.projectsData.loading);

  React.useEffect(() => {
    dispatch(getProjects());
    dispatch(getCategory());
  }, [dispatch]);
  //?Config de pagination
  const cardPerPage = 12;
  const totalCards = projects?.length;
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(totalCards / cardPerPage);
  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  const currentCard = projects?.slice(indexOfFirstCard, indexOfLastCard);
  //?Fin de config de pagination

  //! Listando los tags disponibles segun el filtro
  const tags = projects?.reduce((acumulador, proj) => {
    return acumulador.concat(proj?.Tags.map((tag) => tag.name));
  }, []);

  const setTags = [...new Set(tags)];

  /* const setTags = projects[1]?.Tags.map((tag) => tag.name); */
  console.log(setTags);

  //! Filtros
  const [filtersActives, setFiltersActives] = useState({
    category: "",
    tags: [],
    price: "",
  });

  React.useEffect(() => {
    console.log(filtersActives);
    dispatch(filters(filtersActives));
  }, [dispatch, filtersActives]);

  const handleCategorySelect = (categories) => {
    console.log(categories);
    setFiltersActives({ ...filtersActives, category: categories });
  };
  const handleFilterPrice = (price) => {
    console.log(price);
    setFiltersActives({ ...filtersActives, price: price });
  };
  /*   console.log(projects[0]?.tags); */
  const handleFilterTags = (tag) => {
    console.log(tag);
    /*     dispatch(filterPrice(tags)); */
    if (!filtersActives.tags.includes(tag)) {
      setFiltersActives({
        ...filtersActives,
        tags: [...filtersActives.tags, tag],
      });
    } else {
      setFiltersActives({
        ...filtersActives,
        tags: [...filtersActives.tags.filter((tagState) => tag !== tagState)],
      });
    }
  };

  const handleClearFilters = () => {
    console.log("clear");
    dispatch({ type: "FILTER_CLEAR" });
    setFiltersActives({ category: "", tags: [], price: "" });
  };

  //!end  Filtros

  //* Aqui se maneja el loader
  if (loading) return <Loader />;

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
          <span className="cursor-pointer" onClick={() => handleClearFilters()}>
            (clear)
          </span>
          <h3 className="mt-3">Category</h3>
          <ul className="pl-3">
            {categories?.map((cat) =>
              filtersActives.category === cat.name ? (
                <Chip
                  key={cat.id}
                  onClose={() => handleCategorySelect("")}
                  variant="bordered"
                >
                  🧩 {cat.name}
                </Chip>
              ) : (
                <li
                  key={cat.id}
                  className="cursor-pointer"
                  onClick={() => handleCategorySelect(cat.name)}
                >
                  🧩 {cat.name}
                </li>
              )
            )}
          </ul>
          <h3 className="mt-3">Price</h3>
          <ul className="pl-3">
            {filtersActives.price !== 0 ? (
              <li
                className="cursor-pointer"
                id="free"
                onClick={() => handleFilterPrice(0)}
              >
                ⭐ Free
              </li>
            ) : (
              <Chip onClose={() => handleFilterPrice("")} variant="bordered">
                ⭐ Free
              </Chip>
            )}
            {filtersActives.price !== 1 ? (
              <li
                className="cursor-pointer"
                id="free"
                onClick={() => handleFilterPrice(1)}
              >
                🛒 Paid
              </li>
            ) : (
              <Chip onClose={() => handleFilterPrice("")} variant="bordered">
                🛒 Paid
              </Chip>
            )}
            {filtersActives.price !== 5 ? (
              <li
                className="cursor-pointer"
                onClick={() => handleFilterPrice(5)}
              >
                🛒 $5 or less
              </li>
            ) : (
              <Chip onClose={() => handleFilterPrice("")} variant="bordered">
                🛒 $5 or less
              </Chip>
            )}

            {filtersActives.price !== 15 ? (
              <li
                className="cursor-pointer"
                id="5"
                onClick={() => handleFilterPrice(15)}
              >
                🛒 $15 or less
              </li>
            ) : (
              <Chip onClose={() => handleFilterPrice("")} variant="bordered">
                🛒 $15 or less
              </Chip>
            )}
          </ul>

          {/*           <h3>Last Update</h3> */}
          <h3 className="mt-3">Tags</h3>
          <ul className="pl-3">
            {setTags.map((tag, index) =>
              filtersActives.tags.includes(tag) ? (
                <Chip
                  key={index}
                  onClose={() => handleFilterTags(tag)}
                  variant="bordered"
                >
                  🔖 {tag}
                </Chip>
              ) : (
                <li
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleFilterTags(tag)}
                >
                  🔖 {tag}
                </li>
              )
            )}
          </ul>
        </aside>

        {/* !Main  */}
        <main className="basis-10/12 flex p-4 h-full flex-col justify-center">
          <div className="flex flex-row basis-1/5 align-middle mb-6 ">
            <h1>Trending</h1>
            <Select label="Category" className="w-56 pl-3">
              <SelectItem onPress={(e) => handleCategorySelect("all")}>
                Todos
              </SelectItem>

              {categories?.map((cat) => (
                <SelectItem
                  key={cat.id}
                  value={cat.name}
                  onPress={() => handleCategorySelect(cat.name)}
                >
                  {cat.name}
                </SelectItem>
              ))}
            </Select>
            <span className="pt-3  pl-3">({projects?.length} results)</span>
          </div>
          <div className="flex flex-col basis-4/5 px-4 justify-center">
            <div className="gap-9 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2">
              {currentCard?.length > 0 ? (
                currentCard
                  ?.slice(0, 12)
                  .map((proj) => <ProjectCard proj={proj} key={proj.id} />)
              ) : (
                <p>
                  No hay proyectos disponibles{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => handleClearFilters()}
                  >
                    <b>(clear)</b>
                  </span>
                </p>
              )}
            </div>
            {projects?.length > 12 ? (
              <Pagination
                isCompact
                showControls
                total={totalPages}
                initialPage={1}
                className=" mt-6 items-center self-center"
                onChange={setCurrentPage}
                color="primary"
              />
            ) : (
              <div className="mt-6 h-10"></div>
            )}
          </div>
        </main>
      </div>
    </LayoutUser>
  );
}
