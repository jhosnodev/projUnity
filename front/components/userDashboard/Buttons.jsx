import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { restoreProjects } from "../../redux/actions/actions";
import { deleteProjects } from "../../redux/actions/actions";

import {Button} from "@nextui-org/react";
import Swal from "sweetalert2";

const Buttons = ({ id }) => {
    console.log(id);

    const dispatch = useDispatch()
 const [activeButton, setActiveButton] = useState(false);
  const [desactiveButton, setDesactiveButton] = useState(true);
  
  const active = () => {
    dispatch(restoreProjects(id));
    Swal.fire({
      icon: "success",
      title: "Proyecto activado con exito!",
      showConfirmButton: true,
      timer: 3500,
    });
activeButton
    setActiveButton(false);
    setDesactiveButton(true);
 };
    const desactive = () => {
        dispatch(deleteProjects(id))
        Swal.fire({
          icon: "success",
          title: "Proyecto desactivado con exito!",
          showConfirmButton: true,
          timer: 3500,
        })
      setActiveButton(true);
      setDesactiveButton(false);
  }
  

  
    return (
      <div>
        <Button
          onPress={active}
          isDisabled={!activeButton}
          className="text-white mb-4 mr-8 bg-orange-600 rounded-none text-lg font-bold"
        >
          Activar
        </Button>
        <Button
          onPress={desactive}
          isDisabled={!desactiveButton}
          className="text-white mb-4 mr-8 bg-orange-600 rounded-none text-lg font-bold"
        >
          Desactivar
        </Button>
      </div>
    );
};

export default Buttons;
