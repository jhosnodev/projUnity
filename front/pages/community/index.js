
import React, { useState } from "react";
import LayoutUser from "../../components/layout/layoutUser";
import Loader from "../../components/layout/loader";
import { useDispatch, useSelector } from "react-redux";
import { Select, SelectItem, Pagination, Chip } from "@nextui-org/react";
import SolicitudesCard from "../../components/SolicitudesCard";
import solicitudes from "./solicitudesCom.json"
import {
  getCategory,
  getProjects,
  filters,
  orderCategories,
} from "../../redux/actions/actions";

export default function Community () {

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

  const handleFilterTags = (tag) => {
    console.log(tag);
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

  //! Ordenar por vistas
  const handleTrendingCategory = (category) => {
    dispatch(orderCategories(category));
    console.log(category);
  };
  //! end Ordenar por vistas

  //* Aqui se maneja el loader
  if (loading) return <Loader />;


    return (
      <LayoutUser>
        <h1>Community</h1>
        <main className="basis-10/12 flex p-4 h-full flex-col justify-center">
          <div className="flex flex-row basis-1/5 align-middle mb-6 ">
            <h1>Trending</h1>
            <Select label="Category" className="w-56 pl-3" variant="faded">
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
            <span className="pt-3  pl-3">({solicitudes.data?.length} results)</span>
            {/*    <span
              className="cursor-pointer pt-3  pl-3"
              onClick={() => handleClearFilters()}
            >
              (clear)
            </span> */}
          </div>
        <div>
          <div className="gap-9 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2">
            {solicitudes.data.map((solicitud) => (
              <SolicitudesCard key={solicitud.id} solicitud={solicitud} />
            ))}
          </div>
        </div>
        </main>
      </LayoutUser>
    );
}