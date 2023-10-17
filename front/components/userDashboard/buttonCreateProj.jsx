import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/router";

export const ButtonCreate = () => {

  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleForm = () => {
      router.push("/project/form");
  };
  
  return (
    <div>
      <Button
        onPress={onOpen}
        className="ml-8 w-56 h-16 rounded-none text-lg bg-blue-950 text-white"
      >
        Crear un nuevo proyecto
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
                ¿Quieres crear un nuevo proyecto?
              </ModalHeader>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={handleForm}>
                  Crear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ButtonCreate;
