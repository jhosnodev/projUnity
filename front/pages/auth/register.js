import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions/actions";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    userName: "",
    password: "",
    rePassword: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Introduce un correo valido")
      .required("Introduce un correo"),
    userName: Yup.string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .max(15, "El nombre de usuario debe tener menos de 15 caracteres")
      .required("Introduce un nombre de usuario")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "El nombre de usuario solo puede contener letras y numeros"
      ),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(15, "La contraseña debe tener menos de 15 caracteres")
      .required("Introduce una contraseña"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Confirma la contraseña"),
  });

  const handleSubmit = async (values) => {
    try {
      const data = {
        email: values.email,
        name: values.userName,
        password: values.password,
        role: "common"
      };
      await dispatch(createUser(data));
      toast.success("Usuario creado correctamente!");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error("Error al crear usuario");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-8">Registrarse</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Correo electrónico:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="userName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Nombre de usuario:
                </label>
                <Field
                  type="text"
                  id="userName"
                  name="userName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contraseña:
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="rePassword"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Confirmar contraseña:
                </label>
                <Field
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="rePassword"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Registrarse
                </button>
                <div className="text-sm">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    href="/auth/login"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Inicia sesión aquí
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div>
          <Link 
            href="/" 
            className="text-blue-500 hover:text-blue-700"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
