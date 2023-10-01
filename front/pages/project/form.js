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

  /*   const { handleSubmit } = useForm(); */

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (data) => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Datos enviados al servidor:");
    console.log(data);
    alert("Los datos se han enviado correctamente");
  };

  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | Crear un nuevo proyecto</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="flex justify-center">
        <form
          onSubmit={() => onSubmit()}
          className="p-6 flex flex-col gap-11 bg-background-100  w-12/12 md:w-8/12"
        >
          <h1>Crear nuevo proyecto</h1>

          <div>
            <Input
              isRequired
              type="text"
              label="Title of project"
              defaultValue=""
              variant="faded"
              name="title"
            />
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
              name="shortDesc"
            />
          </div>

          <div>
            <Input
              label="Price"
              placeholder="0.00"
              labelPlacement="outside"
              name="price"
              variant="faded"
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
          </div>

          {/*       <div>
            <input
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleOnChange}
            />

            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleOnChange}
            />
          </div> */}
          <div>
            <Input
              isRequired
              type="text"
              label="Cover del proyecto"
              defaultValue=""
              variant="faded"
              placeholder="URL de cover del proyecto (imagen PNG/JPG)"
              name="imagen"
            />
          </div>

          <div>
            <Textarea
              isRequired
              label="Enter long description"
              labelPlacement="outside"
              placeholder="Enter description of the project"
              name="longDesc"
              variant="faded"
            />
          </div>

          <div>
            <Select
              isRequired
              label="Project status"
              placeholder="Select an status"
              defaultSelectedKeys=""
              name="status"
              variant="faded"
            >
              {status.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <Select
              isRequired
              label="Project Category"
              placeholder="Select an category"
              defaultSelectedKeys=""
              name="category"
              variant="faded"
            >
              {categories.map((categories) => (
                <SelectItem key={categories.value} value={categories.value}>
                  {categories.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <Select
              isRequired
              label="Tags"
              placeholder="Select tags"
              defaultSelectedKeys=""
              name="tags"
              variant="faded"
            >
              {tags.map((tags) => (
                <SelectItem key={tags.value} value={tags.value}>
                  {tags.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <RadioGroup
              label="Allow comments"
              orientation="horizontal"
              name="comments"
            >
              <Radio value="Yes" className=" mr-4">
                Yes
              </Radio>
              <Radio value="No" className=" mr-4">
                No
              </Radio>
            </RadioGroup>
          </div>

          <div>
            <RadioGroup
              label="Visibility"
              orientation="horizontal"
              name="visibility"
            >
              <Radio value="Only me" className=" mr-4">
                Only me
              </Radio>
              <Radio value="Public" className=" mr-4">
                Public
              </Radio>
            </RadioGroup>
          </div>

          <Button
            color="primary"
            variant="shadow"
            className="w-2/12  justify-self-end self-end"
          >
            Create
          </Button>
        </form>
      </div>
    </LayoutUser>
  );
};

export default Form;
