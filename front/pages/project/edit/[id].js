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




const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  category: Yup.string().required("La categoría es obligatoria"),
  image: Yup.string().required("La imagen es obligatoria"),
  url: Yup.string().required("La url es obligatoria"),
  tags: Yup.string().required("Los tags son obligatorios"),
  commentsAllowed: Yup.string().required("Los comentarios son obligatorios"),
  price: Yup.string().required("El precio es obligatorio"),
  status: Yup.string().required("El estado es obligatorio"),
  visibility: Yup.string().required("La visibilidad es obligatoria"),
  shortDescription: Yup.string().required("La descripción corta es obligatoria"),
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
