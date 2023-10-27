import Head from "next/head";
import React, { useState } from "react";
import LayoutUser from "../components/layout/layoutUser";
import Loader from "../components/layout/loader";
import { useDispatch, useSelector } from "react-redux";
import { Select, SelectItem, Pagination, Chip } from "@nextui-org/react";
import ProjectCard from "../components/project/ProjectCard";

import {
  getCategory,
  getProjects,
  filters,
  orderCategories,
} from "../redux/actions/actions";

export default function Browser() {
  //! Get projects
  const dispatch = useDispatch();

  React.useEffect(() => {
    projects.length === 0 &&  dispatch(getProjects());
    dispatch(getCategory());
  }, [dispatch ]); 
  const projects = useSelector((state) => state.projectsData.projectsFilter);
  console.log(projects);
  const allprojects = useSelector((state) => state.projectsData.projects); 
  const categories = useSelector((state) => state.projectsData.categories);

  const loading = useSelector((state) => state.projectsData.loading);


  //?Config de pagination
  const cardPerPage = 12;
  const totalCards = projects?.length;
  const [currentPage, setCurrentPage] = React.useState(1);
  /*   const [currentCard, setCurrentCard] = React.useState([]); */

  const totalPages = Math.ceil(totalCards / cardPerPage);
  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  /* setCurrentCard([...projects?.slice(indexOfFirstCard, indexOfLastCard)]) */
  const currentCard = [...projects?.slice(indexOfFirstCard, indexOfLastCard)];
  /*   console.log(...projects?.slice(indexOfFirstCard, indexOfLastCard)); */
  //?Fin de config de pagination

  //! Listando los tags disponibles segun el filtro
  const tags = projects?.reduce((acumulador, proj) => {
    return acumulador.concat(proj?.Tags.map((tag) => tag.name));
    /* return acumulador.concat(proj?.Tags.map((tag) => tag.name)); */
  }, []);
  const setTags = [...new Set(tags)];
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

  const [valSelect, setValSelect] = useState('')
  //! Ordenar por vistas
  const handleTrendingCategory = (category) => {
    dispatch(orderCategories(category));
    setValSelect(category)
    /*   console.log(category); */
  };
  //! end Ordenar por vistas
  const handleCategorySelect = (categories) => {
    /*     console.log(categories); */
    setFiltersActives({ ...filtersActives, category: categories }); setValSelect('')

  };
  const handleFilterPrice = (price) => {
    /*     console.log(price); */
    setFiltersActives({ ...filtersActives, price: price });
  };

  const handleFilterTags = (tag) => {
    /*     console.log(tag); */
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
    /*   console.log("clear"); */
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
          <h2>Filtros</h2>
          <span className="cursor-pointer" onClick={() => handleClearFilters()}>
            (Limpiar)
          </span>
          <h3 className="mt-3">Categorías</h3>
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
          <h3 className="mt-3">Precios</h3>
          <ul className="pl-3">
            {filtersActives.price !== 0 ? (
              <li
                className="cursor-pointer"
                id="free"
                onClick={() => handleFilterPrice(0)}
              >
                ⭐ Gratis
              </li>
            ) : (
              <Chip onClose={() => handleFilterPrice("")} variant="bordered">
                ⭐ Gratis
              </Chip>
            )}
            {filtersActives.price !== 1 ? (
              <li
                className="cursor-pointer"
                id="free"
                onClick={() => handleFilterPrice(1)}
              >
                🛒 Pagos
              </li>
            ) : (
              <Chip onClose={() => handleFilterPrice("")} variant="bordered">
                🛒 Pagos
              </Chip>
            )}
            {filtersActives.price !== 5 ? (
              <li
                className="cursor-pointer"
                onClick={() => handleFilterPrice(5)}
              >
                🛒 $5 o menos
              </li>
            ) : (
              <Chip onClose={() => handleFilterPrice("")} variant="bordered">
                🛒 $5 o menos
              </Chip>
            )
            }

            {filtersActives.price !== 15 ? (
              <li
                className="cursor-pointer"
                id="5"
                onClick={() => handleFilterPrice(15)}
              >
                🛒 $15 o menos
              </li>
            ) : (
              <Chip onClose={() => handleFilterPrice("")} variant="bordered">
                🛒 $15 o menos
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
            <h1>Tendencias</h1>
            <Select label="Categorías" className="w-56 pl-3" variant="faded" value={valSelect}>
              <SelectItem onPress={(e) => handleTrendingCategory("all")}>
                Todos
              </SelectItem>

              {categories?.map((cat) => (
                <SelectItem
                  key={cat.id}
                  value={cat.name}
                  onPress={() => handleTrendingCategory(cat.name)}
                >
                  {cat.name}
                </SelectItem>
              ))}
            </Select>
            <span className="pt-3  pl-3">({projects?.length} results)</span>
            {/*    <span
              className="cursor-pointer pt-3  pl-3"
              onClick={() => handleClearFilters()}
            >
              (clear)
            </span> */}
          </div>
          <div className="flex flex-col basis-4/5 px-4 justify-center">
            <div className="gap-9 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2">
              {currentCard?.length > 0 ? (
                currentCard
                  ?.slice(0, 12)
                  .map((proj) => <ProjectCard proj={proj} key={proj.id} />)
              ) : (
                <p>
                  No hay proyectos disponibles
                  <span
                    className="cursor-pointer"
                    onClick={() => handleClearFilters()}
                  >
                    <b>(Limpiar)</b>
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
