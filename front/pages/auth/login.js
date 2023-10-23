import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, connect, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/actions";
import axios from "axios";
import Swal from "sweetalert2";

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
    dispatch(loginUser(values));
  };

  const response = useSelector((state) => state.usersData.alert);
  console.log("response es", response);
  if (response.type === "success") {
    router.push("/");
    Swal.fire({
      icon: "success",
      title: "Bienvenido nuevamente.",
      text: response.msg,
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (response.type === "error") {
    Swal.fire({
      icon: "error",
      title: "Error al iniciar sesión",
      text: "Usuario o contraseña incorrectos, verifica tus credenciales e intentalo de nuevo",
    });
  }

  /* const handleGoogleLogin = () => {
    window.location.href = "/oauth2/redirect"
  };

  const handleGithubLogin = () => {
    window.location.href = "/auth/github/callback"
  }; */

  const handleGoogleLogin = () => {
    window.location.href = "/login/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "https://projunity-production.up.railway.app/auth/github/callback"
  };
  
  /* const handleGithubLogin = () => {
    // Check if the user is already authenticated
    fetch('https://projunity-production.up.railway.app/auth/github/callback')
      .then(response => response.json())
      .then(data => {
        if (data.access) {
          window.location.href = "/";
        } else {
          // If the user is not authenticated, redirect to the GitHub login page
          window.location.href = "https://projunity-production.up.railway.app/auth/github/callback";
        }
      })
      .catch(error => console.error(error));
  }; */

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
                  onKeyDown={(e) => console.log(e.key)}
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
              <div className="my-4">
                <p className="text-center text-gray-500 font-semibold text-sm my-2 border-b-2 italic">
                  Tambien puedes iniciar sesión con tu cuenta de:
                </p>
                <div className="flex flex-row gap-4">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-1/2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={handleGithubLogin}
                    className="w-1/2 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Github
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          ← Volver al inicio
        </Link>
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
