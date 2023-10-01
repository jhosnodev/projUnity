import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import React from "react";

export const ButtonDownload = ({ price, name }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button onPress={onOpen} className="mb-4 mr-4" color="primary">
        Download
      </Button>
      {/*       <Button
        className="mb-4 mr-4"
        margin="1"
        color="primary"
        // variant="ghost"
        onPress={() => onOpen}
      >
        Download
      </Button> */}
      <span>{price === "0.00" ? "Free" : `$${price}`}</span>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="indigo-light">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Download {name}
              </ModalHeader>
              <ModalBody>
                <p>
                  {price === "0.00"
                    ? "Este proyecto es gratuito, pero el desarrollador acepta tu apoyo permitiéndote pagar lo que creas que es justo por el projecto"
                    : "Descarga este juego comprándolo por  USD o más"}
                </p>
                <Button color="primary" onPress={onClose}>
                  💕 Colabora con el desarrollador
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  {price === "0.00" ? "⚡Descarga" : "🛒 Comprar"}
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
