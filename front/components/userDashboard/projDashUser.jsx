import ButtonEdit from "./buttonEdit";

import {Button, Link, Image} from "@nextui-org/react";
import React, { useState } from "react";
// commentsAllowed: true;
// createdAt: "2023-10-23T22:44:25.525Z";
// deletedAt: null;
// description: "Un flanger gratuito de la fantástica compañía Valhalla. Once algoritmos para obtener todo tipo de efectos que desafían cualquier descripción. A destacar los efectos que podemos conseguir automatizando los parámetros en nuestro DAW o mediante un teclado controlador MIDI.";
// id: 7;
// image: "https://val-media-offload.s3.amazonaws.com/wp-content/uploads/2016/06/08073920/ValhallaSpaceModGUI-960x437.jpg";
// name: "Valhalla Space Modulator";
// price: "0.00";
// shortDescription: "Un flanger gratuito de la fantástica compañía Valhalla.";
// status: "Canceled";
// updatedAt: "2023-10-23T22:44:25.525Z";
// views: 25;
const ProjDashUser = () => {

 
  const [active, setActive] = useState(true);

  return (
    <div className="flex flex-row m-4">
      <div className="ml-4 bg-slate-300 h-32 w-32"></div>
      <div className="flex bg-white border-slate-300 border-3 w-auto">
        
        <div className="flex flex-col justify-end">
          <div className="flex flex-row ">
            <ButtonEdit />
            <Link href="/profile/analitycs">
              <Button className="ml-4 mb-4 mr-4 rounded-none text-lg font-bold bg-indigo-800 text-white w-44">
                Estadisticas
              </Button>
            </Link>
            <Button
              onPress={() => {
                setActive(!active);
              }}
              className="mb-4 mr-4 bg-orange-600 rounded-none text-lg font-bold "
              color="primary"
            >
              {active ? "Activar" : "Desactivar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjDashUser;
