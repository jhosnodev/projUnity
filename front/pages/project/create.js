import React from "react";
import Form from "../../components/project/form";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addProjects, getCategory } from "../../redux/actions/actions";
import { useFormik } from "formik";
import Head from "next/head";

const Create = () => {
  const initialValues = {
    name: "",
    shortDescription: "",
    price: "",
    image: "",
    description: "",
    status: "",
    category: "",
    tags: [],
    commentsAllowed: "",
    visibility: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre del proyecto es requerido")
      .min(5, "El nombre del proyecto debe tener al menos 5 caracteres")
      .max(100, "El nombre del proyecto debe tener máximo 30 caracteres"),
    shortDescription: Yup.string()
      .required("La descripción corta del proyecto es requerida")
      .min(
        5,
        "La descripción corta del proyecto debe tener al menos 5 caracteres"
      )
      .max(
        50,
        "La descripción corta del proyecto debe tener máximo 50 caracteres"
      ),
    price: Yup.number().required("El precio del proyecto es requerido"),
    image: Yup.string().required("La imagen del proyecto es requerida"),
    description: Yup.string()
      .required("La descripción larga del proyecto es requerida")
      .min(
        20,
        "La descripción larga del proyecto debe tener al menos 20 caracteres"
      )
      .max(
        200,
        "La descripción larga del proyecto debe tener máximo 200 caracteres"
      ),
    status: Yup.string().required("El estado del proyecto es requerido"),
    category: Yup.string().required("La categoría del proyecto es requerida"),
    tags: Yup.string().required("Selecciona tags/etiquetas para tu proyecto"),
    commentsAllowed: Yup.string().required(
      "La opción de comentarios es requerida"
    ),
    visibility: Yup.string().required(
      "La visibilidad del proyecto es requerida"
    ),
  });


  const onSubmit = (values) => {
    try {
      const post = {
        ...values,
        tags: values.tags.split(",").map( tag => parseInt(tag)),
        price: parseFloat(values.price),
        category: parseInt(values.category),
        view: 0,
        commentsAllowed : values.commentsAllowed === 'true' ? true : false,
        visibility : values.visibility === 'true' ? true : false
      };
      dispatch(addProjects(values));
      console.log(values);
      formik.resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Proyecto publicado con éxito!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al procesar la solicitud'
      });
    }
  }

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  
  return (
    <div>
      <Head>
        <title>ProjUnity | Crear un nuevo proyecto</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        title={`Crear nuevo proyecto`}
      />
    </div>
  );
};

export default Create;
