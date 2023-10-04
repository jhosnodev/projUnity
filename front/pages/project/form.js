import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { tags, categories, status } from "../api/data";
/* import styles from "../../styles/form.module.css"; */
import {
  Textarea,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Button,
  Input,
  CustomRadio,
  radioGroup,
} from "@nextui-org/react";
import LayoutUser from "../../components/layoutUser";
import Head from "next/head";

const Form = () => {
  const [values, setValues] = useState({
    images: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log(errors);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | Crear un nuevo proyecto</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="flex justify-center">
        <form
          onSubmit={onSubmit}
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
              {...register("name", {
                required: {
                  value: true,
                  message: "Tu proyecto necesita un titulo",
                },
                minLength: {
                  value: 3,
                  message: "El titulo debe tener minimo 3 caracteres",
                },
                maxLength: {
                  value: 20,
                  message:
                    "el nombre del proyecto no puede superar los 20 caracteres",
                },
              })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>

          {/* <div className={styles.input}>
            <Input
              isRequired
              type="text"
              label="Enter URL of project"
              defaultValue=""
              name="url"
            />
          </div> */}

          <div>
            <Input
              type="text"
              label="Descripcion corta de tu proyecto:"
              defaultValue=""
              variant="faded"
              name="shortDescription"
              {...register("shortDescription", {
                required: {
                  value: true,
                  message: "Agrega una descripcion corta",
                },
                minLength: {
                  value: 5,
                  message: "La descripcion debe contener al menos 5 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "La descripción no puede superar los 30 caracteres",
                },
              })}
            />
            {errors.shortDescription && (
              <span>{errors.shortDescription.message}</span>
            )}
          </div>

          <div>
            <Input
              label="Precio"
              placeholder="0.00"
              labelPlacement="outside"
              name="price"
              variant="faded"
              {...register("price", { required: true })}
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
            {errors.price && <span>Introduce un precio para tu proyecto</span>}
          </div>

          <div>
            {/* <input
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleOnChange}
            /> */}

            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleOnChange}
              {...register("images", { required: true })}
            />
            {errors.images && <span>Tu proyecto necesita una imagen</span>}
          </div>
          <div>
            <Input
              type="text"
              label="Cover del proyecto"
              defaultValue=""
              variant="faded"
              placeholder="URL de cover del proyecto (imagen PNG/JPG)"
              name="image"
              {...register("image", { required: true })}
            />
            {errors.image && <span>Tu proyecto necesita un cover</span>}
          </div>

          <div>
            <Textarea
              labelPlacement="outside"
              placeholder="Introduce una descripcion mas detallada de tu proyecto:"
              name="description"
              variant="faded"
              {...register("description", {
                required: {
                  value: true,
                  message: "Cuenta a detalle tu proyecto",
                },
                minLength: {
                  value: 30,
                  message: "El detalle debe contener al menos 30 caracteres",
                },
                maxLength: {
                  value: 300,
                  message: "El detalle no debe superar los 300 caracteres",
                },
              })}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>

          <div>
            <Select
              label="Status del proyecto"
              placeholder="Selecciona una opcion"
              defaultSelectedKeys=""
              name="status"
              variant="faded"
              {...register("status", { required: true })}
            >
              {status.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </Select>
            {errors.status && <span>Selecciona el estado de tu proyecto</span>}
          </div>

          <div>
            <Select
              label="Categoria del proyecto"
              placeholder="Selecciona una opcion"
              defaultSelectedKeys=""
              name="category"
              variant="faded"
              {...register("category", { required: true })}
            >
              {categories.map((categories) => (
                <SelectItem key={categories.value} value={categories.value}>
                  {categories.label}
                </SelectItem>
              ))}
            </Select>
            {errors.category && (
              <span>Selecciona la categoria de tu proyecto</span>
            )}
          </div>

          <div>
            <Select
              label="Tags"
              placeholder="Selecciona tus tags"
              defaultSelectedKeys=""
              name="category"
              variant="faded"
              isMultiline
              selectionMode="multiple"
              {...register("tags", { required: true })}
            >
              {tags.map((tag) => (
                <SelectItem key={tag.lavel} value={tag.lavel}>
                  {tag.lavel}
                </SelectItem>
              ))}
            </Select>
            {errors.tags && (
              <span>Selecciona tags/etiquetas para tu proyecto</span>
            )}
          </div>

          <div>
            <RadioGroup
              label="Permitir comentarios"
              orientation="horizontal"
              name="commentsAllowed"
            >
              <Radio value="Yes" className="Yes" {...register("commentsAllowed", { required: true })}>
                Si
              </Radio>
              <Radio value="No" className="No" {...register("commentsAllowed", { required: true })}>
                No
              </Radio>
            </RadioGroup>
            {errors.commentsAllowed && <span>Selecciona una opcion</span>}
          </div>

          <div>
            <RadioGroup
              label="Visibilidad"
              orientation="horizontal"
              name="visibility"
            >
              <Radio value="Public" className="public" {...register("visibility", { required: true })}>
                Publico
              </Radio>
              <Radio value="Only me" className="onlyMe" {...register("visibility", { required: true })}>
                Solo para mi
              </Radio>
            </RadioGroup>
            {
              errors.visibility && <span>Selecciona una opcion</span>
            }
          </div>

          <input type="submit" value="Enviar" />
          {/* <Button
            color="primary"
            
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