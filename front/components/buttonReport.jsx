export const ListboxWrapper = ({ children }) => (
  <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
); 

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Listbox,
  ListboxSection,
  ListboxItem,
} from "@nextui-org/react";
// import { ListboxWrapper } from "./ListboxWrapper";

import React from "react";

export const ButtonReport = ({ name }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );
  return (
    <div>
      <Button
        onPress={onOpen}
        className="mb-4 mr-4 rounded-none w-24 text-blue-900 "
      >
        Reportar
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="indigo-light"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Reportar a {name}
              </ModalHeader>
              <ModalBody>
                <p>Selecciona un problema</p>
                <div className="flex flex-col gap-2">
                  <ListboxWrapper>
                    <Listbox
                      className="w-72 text-small"
                      aria-label="Multiple selection example"
                      variant="flat"
                      //   disallowEmptySelection
                      selectionMode="multiple"
                      selectedKeys={selectedKeys}
                      onSelectionChange={setSelectedKeys}
                    >
                      <ListboxItem key="other person">
                        Finge ser otra persona
                      </ListboxItem>
                      <ListboxItem key="fake">Cuenta falsa</ListboxItem>
                      <ListboxItem key="inapropiety">
                        Publica contenido inapropiado
                      </ListboxItem>
                      <ListboxItem key="fake name">Nombre Falso</ListboxItem>
                      <ListboxItem key="estafa">Estafa o Fraude</ListboxItem>
                      <ListboxItem key="intelectualProperty">
                        Infraccion de la propiedad intelectual
                      </ListboxItem>
                    </Listbox>
                  </ListboxWrapper>
                  <p className="text-small text-default-500">
                    Valores seleccionados: {selectedValue}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Reportar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ButtonReport;
