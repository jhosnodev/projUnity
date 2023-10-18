import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import Swal from "sweetalert2";


import React, { useState } from "react";

import { addItem, getAllitems } from "../../redux/actions/actionsCarrito";
import { useDispatch, useSelector } from "react-redux";

export const ButtonDownload = ({ project }) => {
  const quantity = 1;
  const { name, price, image, id, shortDescription, Categories } = project;
  /* console.log(Categories[0]?.name); */
  /*   console.log(Categories[0]?.name); */
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const [collaborateVissible, setCollaborateVissible] = useState(false);
  /*  const alert = useSelector((state) => state.carritoData.alert);
   */
  const handleAddItemToCart = () => {
    console.log(project);
    const item = {
      id,
      name,
      image,
      price,
      shortDescription,
      quantity: quantity,
    };
    console.log(item);
    const alert = addItem(item);
    console.log(alert);
    if (alert.type === "success") {
      Swal.fire({
        icon: 'success',
        title: '¡Carrito agregado éxitosamente!',
        showConfirmButton: false,
        showCloseButton: true,
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Ya tienes este ítem',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 1500
      });
    }
    dispatch(getAllitems());
  };

  const handleDonateToDev = () => {
    Swal.fire({
      icon: 'success',
      title: 'Aquí donamos al dev',
      showConfirmButton: false,
      showCloseButton: true,
      timer: 1500
    });
  };

  const onCollaborate = () => {
    setCollaborateVissible(!collaborateVissible);
  };

  return (
    <div>
      <Button onPress={onOpen} className="mb-4 mr-4" color="primary">
        Descargar
      </Button>

      <span>{project.price === "0.00" ? "Free" : `$${project.price}`}</span>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="indigo-light"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Descargar {project.name}
              </ModalHeader>
              <ModalBody>
                <p>
                  {price === "0.00"
                    ? "Este proyecto es gratuito, pero el desarrollador acepta tu apoyo permitiéndote pagar lo que creas que es justo por el projecto"
                    : "Descarga este juego comprándolo por  USD o más"}
                </p>

                <div className={collaborateVissible ? `visible` : `hidden`}>
                  <Input
                    type="number"
                    label="Tu decides cuanto quieres donar"
                    placeholder="0.00"
                    min={0}
                    className="pb-4"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                  />

                  <Button
                    color="primary"
                    className="w-full"
                    onPress={handleDonateToDev}
                  >
                    🌟 Donar al desarrollador
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                {project.price === "0.00" ? (
                  <Button
                    color={collaborateVissible ? "danger" : "primary"}
                    onPress={onCollaborate}
                  >
                    {collaborateVissible
                      ? "✌ Mejor luego"
                      : "💕 Colabora con el desarrollador"}
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="light"
                    onPress={handleAddItemToCart}
                  >
                    ➕ Añadir al carrito
                  </Button>
                )}

                <Button color="primary" onPress={(onClose, onCollaborate)}>
                  {project.price === "0.00" ? "⚡Descarga" : "🛒 Comprar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ButtonDownload;
