import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Form from "../../../components/form";
import Head from "next/head";
import {
  addProjects,
  getCategory,
  getDetail,
} from "../../../redux/actions/actions";
import { useRouter } from "next/router";

//==================================================================================



const validationSchema = Yup.object({
  name: Yup.string()
    .required("El nombre del proyecto es requerido")
    .min(5, "El nombre del proyecto debe tener al menos 5 caracteres")
    .max(100, "El nombre del proyecto debe tener máximo 30 caracteres"),
  shortDescription: Yup.string()
    .required("La descripción corta del proyecto es requerida")
    .min(5, "La descripción corta del proyecto debe tener al menos 5 caracteres")
    .max(100, "La descripción corta del proyecto debe tener máximo 100 caracteres"),
  price: Yup.number().required("El precio del proyecto es requerido"),
  image: Yup.string().required("La imagen del proyecto es requerida"),
  description: Yup.string()
    .required("La descripción larga del proyecto es requerida")
    .min(20, "La descripción larga del proyecto debe tener al menos 20 caracteres")
    .max(200, "La descripción larga del proyecto debe tener máximo 300 caracteres"),
  status: Yup.string().required("El estado del proyecto es requerido"),
  category: Yup.string().required("La categoría del proyecto es requerida"),
  tags: Yup.string().required("Selecciona tags/etiquetas para tu proyecto"),
  commentsAllowed: Yup.string().required("La opción de comentarios es requerida"),
  visibility: Yup.string().required("La visibilidad del proyecto es requerida"),
});

const EditProject = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(getDetail(id)).then((data) => {
        console.log("data es", data);
      });
    }
  }, [dispatch, id]);

  const project = useSelector((state) => state.projectsData.detail);

  console.log("project es", project);

  const initialValues = {
    name: project.name,
    description: project.description,
    category: project.category,
    image: project.image,
    tags: project.tags,
    commentsAllowed: project.commentsAllowed,
    price: project.price,
    status: project.status,
    visibility: project.visibility,
    shortDescription: project.shortDescription,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(addProjects(values));
      Swal.fire(
        "Proyecto editado",
        "El proyecto se editó correctamente",
        "success"
      );
    },
  });

  if (!project) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Head>
        <title>ProjUnity | Editar un proyecto</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Form
        formik={formik}
        validationSchema={validationSchema}
        initialValues={formik.initialValues}
        onSubmit={formik.onSubmit}
      />
    </div>
  );
};

export default EditProject;
