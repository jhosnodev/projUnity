import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export const ButtonPromotion = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button
        onPress={onOpen}
        className="ml-8 w-56 h-16 rounded-none text-lg bg-blue-950 text-white"
      >
        Promocionar proyecto
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
                ¿Quieres promocionar este proyecto?
              </ModalHeader>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
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

export default ButtonPromotion;
