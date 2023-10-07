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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from "react";

import { addItem } from "../redux/actions/carrito";
import { useDispatch, useSelector } from "react-redux";

export const ButtonDownload = ({ project }) => {
  const { name, price, image, id, shortDescription } = project;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const [collaborateVissible, setCollaborateVissible] = useState(false);
  const alert = useSelector((state) => state.carritoData.alert);

  const handleAddItemToCart = () => {
    console.log(project);
    const item = { id, name, image, price, shortDescription };
    console.log(item);
    dispatch(addItem(item));

    if (alert?.type === "success") {
      toast.success(alert.msg);
    } else {
      toast.error(alert.msg);
    }
  };

  const handleDonateToDev = () => {
    console.log("aqui donamos al dev en algun punto");
  };

  const onCollaborate = () => {
    setCollaborateVissible(!collaborateVissible);
  };
  return (
    <div>
      <Button onPress={onOpen} className="mb-4 mr-4" color="primary">
        Download
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
                Download {project.name}
              </ModalHeader>
              <ModalBody>
                <p>
                  {price === "0.00"
                    ? "Este proyecto es gratuito, pero el desarrollador acepta tu apoyo permitiéndote pagar lo que creas que es justo por el projecto"
                    : "Descarga este juego comprándolo por  USD o más"}
                </p>
                <Button
                  color={collaborateVissible ? "danger" : "primary"}
                  onPress={onCollaborate}
                >
                  {collaborateVissible
                    ? "✌ Mejor luego"
                    : "💕 Colabora con el desarrollador"}
                </Button>
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
                <Button
                  color="primary"
                  variant="light"
                  onPress={handleAddItemToCart}
                >
                  ➕ Añadir al carrito
                </Button>
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
