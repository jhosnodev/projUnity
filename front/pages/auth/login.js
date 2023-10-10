import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, connect, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/actions";
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Introduce un correo valido")
      .required("Introduce un correo"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(15, "La contraseña debe tener menos de 15 caracteres")
      .required("Introduce una contraseña"),
  });

  const onSubmit = (values) => {
    console.log("values es", values);
    dispatch (loginUser(values))
  };
  
  const response = useSelector((state) => state.usersData.alert);
  console.log("response es", response);
  if (response.type === "success") {
    router.push("/");
    toast.success(response.msg);
  } else if (response.type === "error") { 
    toast.error(response.msg);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-8">Bienvenido a ProjUnity</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Correo electrónico:
                </label>
                <Field
                  type="email"
                  id="username"
                  name="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-6">
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
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Iniciar sesión
                </button>
                <div className="text-sm">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    href="/auth/register"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Regístrate aquí
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const login = ({ error }) => {
  return {
    error: error,
  };
};

const mapStateToProps = (state) => {
  return {
    error: state.auth?.error,
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
