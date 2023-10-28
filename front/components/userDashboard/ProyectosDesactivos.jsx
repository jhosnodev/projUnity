import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { restoreProjects } from "../../redux/actions/actions";
import { deleteProjects } from "../../redux/actions/actions";

import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";

const ProyectosDesactivos = () => {

    const dispatch = useDispatch();
    const deleted = useSelector((state) => state.projectsData.projectsRestore);
console.log(deleted);

 const active = () => {
   dispatch(restoreProjects());
   Swal.fire({
     icon: "success",
     title: "Proyecto activado con exito!",
     showConfirmButton: true,
     timer: 3500,
   });

 
 };
  return (
    <div>
          <Button
              onPress={active}
      className="text-white mb-4 mr-8 bg-orange-600 rounded-none text-lg font-bold"
      >
        Activar Proyectos
      </Button>
    </div>
  );
};

export default ProyectosDesactivos;
