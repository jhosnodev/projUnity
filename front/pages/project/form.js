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
  } = useForm();

  console.log(errors)
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = handleSubmit((data)=>{
    console.log(data)
  })


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
              label="Title of project"
              defaultValue=""
              variant="faded"
              name="name"
              {...register("name", { required: true })}
              isInvalid={errors.name}
              /* errorMessage="Tu proyecto necesita un titulo" */
            />
            {
              errors.name && <span>Tu proyecto necesita un titulo</span>
            }
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
              isInvalid={errors.shortDescription}
            />
            {
              errors.shortDescription && <span>Tu proyecto necesita una descripcion</span>
            }
          </div>

          <div>
            <Input
              label="Price"
              placeholder="0.00"
              labelPlacement="outside"
              name="price"
              variant="faded"
              {...register("price", { required: true })}
              isInvalid={errors.price}
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
            {
              errors.price && <span>Tu proyecto necesita un precio</span>
            }
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
              isInvalid={errors.images}
            />
            {
              errors.images && <span>Tu proyecto necesita una imagen</span>
            }
          </div>
          <div>
            <Input
              isRequired
              type="text"
              label="Cover del proyecto"
              defaultValue=""
              variant="faded"
              placeholder="URL de cover del proyecto (imagen PNG/JPG)"
              name="image"
              {...register("image", { required: true })}
              isInvalid={errors.image}
            />
            {
              errors.image && <span>Tu proyecto necesita un cover</span>
            }
          </div>

          <div>
            <Textarea
              isRequired
              label="Enter long description"
              labelPlacement="outside"
              placeholder="Enter description of the project"
              name="description"
              variant="faded"
              {...register("description", { required: true })}
              isInvalid={errors.description}
            />
            {
              errors.description && <span>Tu proyecto necesita una descripcion</span>
            }
          </div>

          <div>
            <Select
              isRequired
              label="Project status"
              placeholder="Select an status"
              defaultSelectedKeys=""
              name="status"
              variant="faded"
              {...register("status", { required: true })}
              isInvalid={errors.status}
            >
              {status.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </Select>
            {
              errors.status && <span>Selecciona el estado de tu proyecto</span>
            }
          </div>

          <div>
            <Select
              isRequired
              label="Project Category"
              placeholder="Select an category"
              defaultSelectedKeys=""
              name="category"
              variant="faded"
              {...register("category", { required: true })}
              isInvalid={errors.category}
            >
              {categories.map((categories) => (
                <SelectItem key={categories.value} value={categories.value}>
                  {categories.label}
                </SelectItem>
              ))}
            </Select>
            {
              errors.category && <span>Selecciona la categoria de tu proyecto</span>
            }
          </div>

          <div>
            <Select
              isRequired
              label="Tags"
              placeholder="Selecciona tus tags"
              defaultSelectedKeys=""
              name="category"
              variant="faded"
              isMultiline
              selectionMode="multiple"
              {...register("tags", { required: true })}
              isInvalid={errors.tags}
            >
              {tags.map((tag) => (
                <SelectItem key={tag.lavel} value={tag.lavel}>
                  {tag.lavel}
                </SelectItem>
              ))}
            </Select>
            {
              errors.tags && <span>Selecciona tags/etiquetas para tu proyecto</span>
            }
          </div>

          <div>
            <RadioGroup
              label="Allow comments"
              orientation="horizontal"
              name="comments"
              {...register("comments", { required: true })}
              isInvalid={errors.comments}
            >
              <Radio value="Yes" className=" mr-4">
                Yes
              </Radio>
              <Radio value="No" className=" mr-4">
                No
              </Radio>
            </RadioGroup>
            {
              errors.comments && <span>Selecciona una opcion</span>
            }
          </div>

          <div>
            <RadioGroup
              label="Visibility"
              orientation="horizontal"
              name="visibility"
              {...register("visibility", { required: true })}
              isInvalid={errors.visibility}
            >
              <Radio value="Only me" className=" mr-4">
                Only me
              </Radio>
              <Radio value="Public" className=" mr-4">
                Public
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
