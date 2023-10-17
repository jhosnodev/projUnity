import ButtonEdit from "./buttonEdit";

import {Button, Link} from "@nextui-org/react";
import React, { useState } from "react";

const ProjDashUser = () => {
  const [active, setActive] = useState(false);

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
