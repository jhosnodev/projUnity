import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Form from "../../../components/project/form";
import Head from "next/head";
import {
  getCategory,
  getDetail,
  updateProject,
} from "../../../redux/actions/actions";
import { useRouter } from "next/router";

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

  let initialValues = {};

  if (project.id) {
    initialValues = {
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

    const onSubmit = (values, formik) => {
    /*   dispatch(updateProject(data)); */

      try {
        const post = {
          ...values,
          tags: values.tags.split(",").map((tag) => parseInt(tag)),
          price: parseFloat(project.price),
          category: parseInt(project.category),
          views: 0,
          commentsAllowed: project.commentsAllowed === "true" ? true : false,
          visibility: project.visibility === "true" ? true : false,
          userId: sesion.id,
          id: project.id
        };
        dispatch(updateProject(post));
        console.log(post);
        formik.resetForm();
        Swal.fire({
          icon: "success",
          title: "Proyecto publicado con éxito!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al procesar la solicitud",
        });
      }
      /*      Swal.fire(
        "Proyecto editado",
        "El proyecto se editó correctamente",
        "success"
      ); */
    };

    if (!project) {
      return <div>Cargando...</div>;
    }

    return (
      <div>
        <Head>
          <title>ProjUnity | Editar {project.name}</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        {/* validationSchema={validationSchema} */}
        {/*    formik={formik} */}
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          title={`Editar ${project.id ? project.name : null}`}
        />
      </div>
    );
  }
};

export default EditProject;
