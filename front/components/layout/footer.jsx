import { Link } from "@nextui-org/react";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-white py-4 flex flex-col">
      <div className="container mx-auto flex justify-between flex-row gap-12">
        <div className="w-3/12 flex flex-col gap-4 ">
          <h2 className="text-lg font-semibold text-background-100">
            Navegación
          </h2>
          <Link href="/" className="text-background font-medium pl-1">
            Home
          </Link>
          <Link href="/browser" className="text-background font-medium  pl-1">
            Proyectos
          </Link>

          <Link href="/feed" className="text-background font-medium pl-1">
            Novedades
          </Link>

          <Link
            href="/community"
            className="text-background-50 font-medium pl-1"
          >
            Comunidad
          </Link>
        </div>
        <div className="w-3/12 flex flex-col gap-4 ">
          <h2 className="text-lg font-semibold text-background-100">
            Contacto
          </h2>
          <p className="text-sm">
            Si tienes alguna pregunta o comentario, no dudes en ponerte en
            contacto con nosotros en{" "}
            <a
              href="mailto:info@example.com"
              className="text-blue-400 hover:underline"
            >
              info@projunity.com
            </a>
            .
          </p>
          <Link href="#" className="text-background font-medium pl-1">
            Conocenos
          </Link>
          
          <Link href="#" className="text-background font-medium pl-1">
            Terminos y condiciones
          </Link>
        </div>



        <div className="w-6/12 mr-6  flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-background-100">
            Acerca de nosotros
          </h2>
          <p className="text-sm ">
            Somos un equipo de desarrolladores apasionados que trabajamos en la
            creación de esta plataforma de trabajo colaborativo. Nuestro
            objetivo es proporcionar una herramienta efectiva para que los
            equipos puedan colaborar de manera más eficiente en sus proyectos.
          </p>
        </div>
      </div>
      <div className="container mx-auto flex justify-center flex-row w-full mt-6">
        ProjUnity 2023
      </div>
    </footer>
  );
};

export default Footer;
