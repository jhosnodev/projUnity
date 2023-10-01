import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { tags, categories, status } from "../api/data";
import styles from "../../styles/form.module.css";
import {
  Textarea,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Button,
  Input,
} from "@nextui-org/react";
import LayoutUser from "../../components/layoutUser";

const Form = () => {
  const [values, setValues] = useState({
    images: [],
  });

  const { handleSubmit } = useForm();

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
      <div className={styles.div}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.general}>
            <div className={styles.input}>
              <Input
                isRequired
                type="text"
                label="Title of project"
                defaultValue=""
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

            <div className={styles.input}>
              <Input
                isRequired
                type="text"
                label="Short Description of project"
                defaultValue=""
                name="shortDesc"
              />
            </div>

            <div className={styles.price}>
              <Input
                label="Price"
                placeholder="0.00"
                labelPlacement="outside"
                name="price"
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

            <div className={styles.img}>
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
            </div>

            <div className={styles.longDesc}>
              <Textarea
                isRequired
                label="Enter long description"
                labelPlacement="outside"
                placeholder="Enter description of the project"
                name="longDesc"
              />
            </div>

            <div className={styles.select}>
              <Select
                isRequired
                label="Project status"
                placeholder="Select an status"
                defaultSelectedKeys=""
                name="status"
              >
                {status.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className={styles.select}>
              <Select
                isRequired
                label="Project Category"
                placeholder="Select an category"
                defaultSelectedKeys=""
                name="category"
              >
                {categories.map((categories) => (
                  <SelectItem key={categories.value} value={categories.value}>
                    {categories.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className={styles.select}>
              <Select
                isRequired
                label="Tags"
                placeholder="Select tags"
                defaultSelectedKeys=""
                name="tags"
              >
                {tags.map((tags) => (
                  <SelectItem key={tags.value} value={tags.value}>
                    {tags.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className={styles.radio}>
              <RadioGroup
                label="Allow comments"
                orientation="horizontal"
                name="comments"
              >
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </RadioGroup>
            </div>

            <div className={styles.radio}>
              <RadioGroup
                label="Visibility"
                orientation="horizontal"
                name="visibility"
              >
                <Radio value="Only me">Only me</Radio>
                <Radio value="Public">Public</Radio>
              </RadioGroup>
            </div>

            <Button color="primary" variant="shadow" className={styles.button}>
              Upload
            </Button>
          </div>
        </form>
      </div>
    </LayoutUser>
  );
};

export default Form;
