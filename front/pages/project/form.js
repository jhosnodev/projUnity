import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { tags, categories, status } from "../api/data";
import LayoutUser from "../../components/layoutUser";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, addProjects } from "../../redux/actions/actions";
import Loader from "../../components/loader";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Textarea,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Button,
  Input,
  CustomRadio,
  useSelect,
  
} from "@nextui-org/react";

//========================================================================================

const Form = () => {
  const [values, setValues] = useState({
    images: [],
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      shortDescription: "",
      price: "",
      image: "",
      description: "",
      status: "",
      category: "",
      tags: "",
      commentsAllowed: "",
      visibility: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Tu proyecto necesita un titulo")
        .min(3, "El titulo debe tener minimo 5 caracteres")
        .max(20, "el nombre del proyecto no puede superar los 40 caracteres"),
      shortDescription: Yup.string()
        .required("Agrega una descripcion corta")
        .min(15, "La descripcion debe contener al menos 15 caracteres")
        .max(50, "La descripción no puede superar los 50 caracteres"),
      price: Yup.number()
      .required("Introduce un precio para tu proyecto")
      .min(0, "El precio debe ser mayor o igual a 0"),
      image: Yup.string().required("Tu proyecto necesita un cover"),
      description: Yup.string()
        .required("Cuenta a detalle tu proyecto")
        .min(30, "El detalle debe contener al menos 30 caracteres")
        .max(500, "El detalle no debe superar los 500 caracteres"),
      status: Yup.string().required("Selecciona el estado de tu proyecto"),
      category: Yup.string().required("Selecciona la categoria de tu proyecto"),
      tags: Yup.string().required("Selecciona tags/etiquetas para tu proyecto"),
      commentsAllowed: Yup.string().required("Selecciona una opcion"),
      visibility: Yup.string().required("Selecciona una opcion"),
    }),
    onSubmit: (values) => {
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
        toast.success('Tu Proyecto se publicó con éxito!');
      } catch (error) {
        console.error(error);
        toast.error('Hubo un error al procesar la solicitud');
      }
    },
  });

/*   useEffect(() => {
    formik.validateForm();
  }, []); */

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  /*   const categories = useSelector((state) => state.projectsData.categories); */
  const loading = useSelector((state) => state.projectsData.loading);
  const alert = useSelector((state) => state.projectsData.alert);

  /* console.log(alert); */
  if (loading) return <Loader />;



  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | Crear un nuevo proyecto</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="flex justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="p-6 flex flex-col gap-11 bg-background-100  w-12/12 md:w-8/12"
          encType="multipart/form-data"
        >
          <h1>Crear nuevo proyecto</h1>

          <div>
            <Input
              type="text"
              label="Titulo del Proyecto:"
              defaultValue=""
              variant="faded"
              name="name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <span>{formik.errors.name}</span>
            )}
          </div>

          <div>
            <Input
              type="text"
              label="Short Description of project"
              defaultValue=""
              variant="faded"
              name="shortDescription"
              {...formik.getFieldProps("shortDescription")}
            />
            {formik.touched.shortDescription && formik.errors.shortDescription && (
              <span>{formik.errors.shortDescription}</span>
            )}
          </div>

          <div>
            <Input
              label="Price"
              placeholder="0.00"
              labelPlacement="outside"
              name="price"
              variant="faded"
              {...formik.getFieldProps("price")}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              endContent={
                <div className="flex items-center">
                  <label className="sr-only" htmlFor="currency">
                    Currency
                  </label>
                  <select
                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                    id="currency"
                    name="currency"
                  >
                    <option>USD</option>
                  </select>
                </div>
              }
              type="number"
            />
            {formik.touched.price && formik.errors.price && (
              <span>{formik.errors.price}</span>
            )}
          </div>

          <div>
            <Input
              type="text"
              label="Cover del proyecto"
              defaultValue=""
              variant="faded"
              placeholder="URL de cover del proyecto (imagen PNG/JPG)"
              name="image"
              {...formik.getFieldProps("image")}
            />
            {formik.touched.image && formik.errors.image && (
              <span>{formik.errors.image}</span>
            )}
          </div>

          <div>
            <Textarea
              label="Enter long description"
              labelPlacement="outside"
              placeholder="Enter description of the project"
              name="description"
              variant="faded"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <span>{formik.errors.description}</span>
            )}
          </div>

          <div>
            <Select
              label="Project status"
              placeholder="Select an status"
              defaultSelectedKeys=""
              name="status"
              variant="faded"
              {...formik.getFieldProps("status")}
            >
              {status.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </Select>
            {formik.touched.status && formik.errors.status && (
              <span>{formik.errors.status}</span>
            )}
          </div>

          <div>
            <Select
              label="Project Category"
              placeholder="Select an category"
              defaultSelectedKeys=""
              name="category"
              variant="faded"
              {...formik.getFieldProps("category")}
            >
              {categories.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
            {formik.touched.category && formik.errors.category && (
              <span>{formik.errors.category}</span>
            )}
          </div>

          <div>
            <Select
              label="Tags"
              placeholder="Selecciona tus tags"
              defaultSelectedKeys=""
              name="tags"
              variant="faded"
              isMultiline
              selectionMode="multiple"
              {...formik.getFieldProps("tags")}
            >
              {tags.map((tag) => (
                <SelectItem key={tag.value} value={tag.value}>
                  {tag.label}
                </SelectItem>
              ))}
            </Select>
            {formik.touched.tags && formik.errors.tags && (
              <span>{formik.errors.tags}</span>
            )}
          </div>

          <div>
            <RadioGroup
              label="Allow comments"
              orientation="horizontal"
              name="commentsAllowed"
              {...formik.getFieldProps("commentsAllowed")}
            >
              <Radio value="true" className="commentsAllowed">
                Yes
              </Radio>
              <Radio value="false" className="commentsAllowed">
                No
              </Radio>
            </RadioGroup>
            {formik.touched.commentsAllowed && formik.errors.commentsAllowed && (
              <span>{formik.errors.commentsAllowed}</span>
            )}
          </div>

          <div>
            <RadioGroup
              label="Visibility"
              orientation="horizontal"
              name="visibility"
              {...formik.getFieldProps("visibility")}
            >
              <Radio value="false" className="visibility" >
                Only me
              </Radio>
              <Radio value="true" className="visibility" >
                Public
              </Radio>
            </RadioGroup>
            {formik.touched.visibility && formik.errors.visibility && (
              <span>{formik.errors.visibility}</span>
            )}
          </div>

          <input
            type="submit"
            className="w-2/12  justify-self-end self-end p-2 bg-primary rounded-md text-background cursor-pointer"
          />
          {/* <Button
            color="primry"
            
            className="w-2/12  justify-self-end self-end"
          >
            Create
          </Button> */}
        </form>
      </div>
    </LayoutUser>
  );
};

export default Form;