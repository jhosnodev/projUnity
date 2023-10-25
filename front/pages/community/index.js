import React, { useState } from "react";
import MyCard from "../../components/community/cardCommunity"; // Importa tu componente de tarjeta personalizado
import Head from "next/head";
import LayoutUser from "../../components/layout/layoutUser";
import Loader from "../../components/layout/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  Box,
  Heading,
  Select,
  Text,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { FiTag } from "react-icons/fi";
// import ProjectCard from "../components/ProjectCard";

import {
  getCategory,
  getProjects,
  filters,
  orderCategories,
} from "../../redux/actions/actions";

export default function CommunityView() {
  //! Get projects
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projectsData.projectsFilter);
  console.log(projects);
  /*   const allprojects = useSelector((state) => state.projectsData.projects); */
  const categories = useSelector((state) => state.projectsData.categories);

  const loading = useSelector((state) => state.projectsData.loading);

  React.useEffect(() => {
    projects.length === 0 && dispatch(getProjects());
    dispatch(getCategory());
  }, [dispatch, projects]);

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

  const filteredProjects = projects.filter((project) => {
    if (tags.length === 0) return true; // No se han seleccionado tags, muestra todo
    return project.Tags.some((tag) => tags.includes(tag.name));
  });

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

  //! Ordenar por vistas
  const handleTrendingCategory = (category) => {
    dispatch(orderCategories(category));
    /*   console.log(category); */
  };
  //! end Ordenar por vistas

  //* Aqui se maneja el loader
  if (loading) return <Loader />;

  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | Comunidad</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Box className="community-view m-4 ">
        <Box className="community-header">
          <Box m="4">
            <Heading as="h1">Comunidad</Heading>
            <Flex alignItems="center" m="4">
              <Text fontSize="3xl" as="b">
                Tendencias
              </Text>
              <Select
                label="Categorías"
                width="56"
                paddingLeft="3"
                variant="outline"
                onChange={(e) => handleTrendingCategory(e.target.value)}
              >
                <option
                  value="all"
                  onClick={() => handleTrendingCategory("all")}
                >
                  Todos
                </option>
                {categories?.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.name}
                    onClick={() => handleTrendingCategory(cat.name)}
                  >
                    {cat.name}
                  </option>
                ))}
              </Select>
              <Text pt="3" pl="3" mr="4">
                ({projects?.length} results)
              </Text>
              <Button
                onClick={() => handleClearFilters()}
                colorScheme="purple"
                size="sm"
              >
                CLEAR
              </Button>
            </Flex>
          </Box>
          <Flex flexWrap="wrap" pl="3">
            {setTags.map((tag, index) => (
              <Tooltip label={tag} key={index} placement="top">
                {filtersActives.tags.includes(tag) ? (
                  <Flex
                    alignItems="center"
                    bg="gray.200" // Fondo gris para resaltar el icono y el texto
                    p="2" // Espaciado dentro del elemento
                    borderRadius="md" // Bordes redondeados
                    mx="2"
                    cursor="pointer"
                    _hover={{
                      // Estilo al pasar el mouse
                      bg: "gray.300", // Cambia el color de fondo al pasar el mouse
                    }}
                    onClick={() => handleFilterTags(tag)}
                  >
                    <FiTag size={16} /> {/* Tamaño del ícono */}
                    <Box ml="2">{tag}</Box>{" "}
                    {/* Espacio entre el ícono y el texto */}
                  </Flex>
                ) : (
                  <Flex
                    alignItems="center"
                    bg="gray.200"
                    p="2"
                    borderRadius="md"
                    mx="2"
                    cursor="pointer"
                    _hover={{
                      bg: "gray.300",
                    }}
                    onClick={() => handleFilterTags(tag)}
                    mb="2"
                  >
                    <FiTag size={16} />
                    <Box ml="2">{tag}</Box>
                  </Flex>
                )}
              </Tooltip>
            ))}
          </Flex>
        </Box>
        <Box className="community-content">
          <Box className="community-projects">
            <Flex className="gap-9 basis-10/12 px-4 justify-center p-8">
              {/* Muestra proyectos filtrados en dos columnas */}
              {filteredProjects.slice(0, 2).map((project) => (
                <MyCard project={project} key={project.id} />
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>
    </LayoutUser>
  );
}
