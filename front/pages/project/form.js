import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { tags, categories, status } from "../api/data";
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
import LayoutUser from "../../components/layoutUser";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, addProjects } from "../../redux/actions/actions";
import Loader from "../../components/loader";

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

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = handleSubmit((data) => {
    if (errors.length > 0) {
      console.log(errors);
    } else {
      const post = {
        ...data,
        tags: data.tags.split(",").map( tag => parseInt(tag)),
        price: parseFloat(data.price),
        category: parseInt(data.category),
        view: 0,
        commentsAllowed : data.commentsAllowed === 'true' ? true : false,
        visibility : data.visibility === 'true' ? true : false
      };
      dispatch(addProjects(data));
      console.log(data);
      reset();
    }
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  /*   const categories = useSelector((state) => state.projectsData.categories); */
  const loading = useSelector((state) => state.projectsData.loading);
  const alert = useSelector((state) => state.projectsData.alert);

  console.log(alert);
  if (loading) return <Loader />;

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
              isRequired
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

              /* errorMessage="Tu proyecto necesita un titulo" */
            />
            {/*
                  isInvalid={errors.name}
              errorMessage={isInvalid && "Please enter a valid email"}
            */}
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
              isRequired
              type="text"
              label="Short Description of project"
              defaultValue=""
              variant="faded"
              name="shortDescription"
              {...register("shortDescription", { required: true })}
            />
            {/*   isInvalid={errors.shortDescription} */}
            {errors.shortDescription && (
              <span>Tu proyecto necesita una descripcion</span>
            )}
          </div>

          <div>
            {/* isInvalid={errors.price} */}
            <Input
              label="Price"
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
                    <option>ARS</option>
                  </select>
                </div>
              }
              type="number"
            />
            {errors.price && <span>Tu proyecto necesita un precio</span>}
          </div>

          {/* <input
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleOnChange}
            /> */}

          {/*         isInvalid={errors.image} */}
          {/*           <div>
            <input
              type="file"
              name="image"
              multiple
              accept="image/*"
              onChange={handleOnChange}
              {...register("image", { required: true })}
            />
            {errors.image && <span>Tu proyecto necesita una imagen</span>}
          </div> */}
          <div>
            {/* isInvalid={errors.cover} */}
            <Input
              isRequired
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
            {/* isInvalid={errors.description} */}
            <Textarea
              isRequired
              label="Enter long description"
              labelPlacement="outside"
              placeholder="Enter description of the project"
              name="description"
              variant="faded"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span>Tu proyecto necesita una descripcion</span>
            )}
          </div>

          <div>
            {/* isInvalid={errors.status */}
            <Select
              isRequired
              label="Project status"
              placeholder="Select an status"
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
            {/* isInvalid={errors.category} */}
            <Select
              isRequired
              label="Project Category"
              placeholder="Select an category"
              defaultSelectedKeys=""
              name="category"
              variant="faded"
              {...register("category", { required: true })}
            >
              {categories.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
            {errors.category && (
              <span>Selecciona la categoria de tu proyecto</span>
            )}
          </div>

          <div>
            {/* isInvalid={errors.tags} */}
            {/*    {console.log(tags)} */}
            <Select
              isRequired
              label="Tags"
              placeholder="Selecciona tus tags"
              defaultSelectedKeys=""
              name="tags"
              variant="faded"
              isMultiline
              selectionMode="multiple"
              {...register("tags", { required: true })}
            >
              {tags.map((tag) => (
                <SelectItem key={tag.value} value={tag.value}>
                  {tag.label}
                </SelectItem>
              ))}
            </Select>
            {errors.tags && (
              <span>Selecciona tags/etiquetas para tu proyecto</span>
            )}
          </div>

          {/* isInvalid={errors.comments} */}
          {/*           {...register("commentsAllowed", { required: true })} */}
          <div>
            <RadioGroup
              label="Allow comments"
              orientation="horizontal"
              name="commentsAllowed"
              {...register("commentsAllowed", { required: true })}
            >
              <Radio value="true" className=" mr-4">
                Yes
              </Radio>
              <Radio value="false" className=" mr-4">
                No
              </Radio>
            </RadioGroup>
            {errors.commentsAllowed && <span>Selecciona una opcion</span>}
          </div>

          <div>
            {/* isInvalid={errors.visibility} */}
            {/* {...register("visibility", { required: true })} */}
            <RadioGroup
              label="Visibility"
              orientation="horizontal"
              name="visibility"
              {...register("visibility", { required: true })}
            >
              <Radio value="false" className=" mr-4">
                Only me
              </Radio>
              <Radio value="true" className=" mr-4">
                Public
              </Radio>
            </RadioGroup>
            {errors.visibility && <span>Selecciona una opcion</span>}
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
