import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { tags, categories, status } from "../../pages/api/data";
import LayoutUser from "../layout/layoutUser";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, addProjects } from "../../redux/actions/actions";


import Loader from "../../components/layout/loader";

import Swal from "sweetalert2";
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


const Form = ({ initialValues, onSubmit, title }) => {

    const validationSchema = Yup.object({
        name: Yup.string()
          .required("Queremos saber como se llama tu proyecto")
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
        price: Yup.number().required("Si quieres que tu proyecto sea gratuito tienes que colocar un 0"),
        image: Yup.string().required("Has que se vea lindo, pon una imagen "),
        description: Yup.string()
          .required("Cuentanos a profundidad sobre tu proyecto, así todos podrán conerlo")
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
        tags: Yup.string().required("Selecciona tags/etiquetas para que sea más fácil de encontrar"),
        commentsAllowed: Yup.string().required(
          "La opción de comentarios es requerida"
        ),
        visibility: Yup.string().required(
          "La visibilidad del proyecto es requerida"
        ),
      });
    

  const [values, setValues] = useState({
    images: [],
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const loading = useSelector((state) => state.projectsData.loading);
  const alert = useSelector((state) => state.projectsData.alert);

  if (loading) return <Loader />;

  return (
    <LayoutUser>
      <div className="flex justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="p-6 flex flex-col gap-11 bg-background-100  w-12/12 md:w-8/12"
          encType="multipart/form-data"
        >
          <h1>{title}</h1>
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
              label="Descripción corta"
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
              label="Precio"
              placeholder="0.00"
              labelPlacement="outside"
              name="price"
              min='0'
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
            {/*       <select
                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                    id="currency"
                    name="currency"
                  >
                    <option>USD</option>
                  </select> */}
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
              label="Descripción larga"
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
              label="Estatus del proyecto"
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
              label="Categoría"
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
              label="Permitir comentarios"
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
              label="Visibilidad"
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
        </form>
      </div>
    </LayoutUser>
  );
};

export default Form;    