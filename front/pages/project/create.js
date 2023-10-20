import React from "react";
import Form from "../../components/project/form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addProjects, getCategory } from "../../redux/actions/actions";
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

  const sesion = useSelector((state) => state.usersData.sesion);
  const dispatch = useDispatch();

  const onSubmit = (values, formik) => {
    // const formik = useFormikContext();

    try {
      const post = {
        ...values,
        tags: values.tags.split(",").map((tag) => parseInt(tag)),
        price: parseFloat(values.price),
        category: parseInt(values.category),
        views: 0,
        commentsAllowed: values.commentsAllowed === "true" ? true : false,
        visibility: values.visibility === "true" ? true : false,
        userId: sesion.id,
      };
      dispatch(addProjects(post));
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
  };

  // const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);



  return (
    <div>
      <Head>
        <title>ProjUnity | Crear un nuevo proyecto</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      {/*         validationSchema={validationSchema} */}
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        title={`Crear nuevo proyecto`}
      />
    </div>
  );
};

export default Create;
