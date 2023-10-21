import React from "react";

const Footer = () => {
  return (
    <footer className="text-white py-2">
      <div className="container mx-auto flex justify-between">
        <div className="w-1/2 mr-6">
          <h2 className="text-lg font-semibold">Acerca de nosotros</h2>
          <p className="text-sm text-justify">
            Somos un equipo de desarrolladores apasionados que trabajamos en la
            creación de esta plataforma de trabajo colaborativo. Nuestro
            objetivo es proporcionar una herramienta efectiva para que los
            equipos puedan colaborar de manera más eficiente en sus proyectos.
          </p>
        </div>
        <div className="w-1/2">
          <h2 className="text-lg font-semibold">Contacto</h2>
          <p className="text-sm">
            Si tienes alguna pregunta o comentario, no dudes en ponerte en
            contacto con nosotros en{" "}
            <a
              href="mailto:info@example.com"
              className="text-blue-400 hover:underline"
            >
              info@example.com
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

