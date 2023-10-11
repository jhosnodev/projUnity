import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export const ButtonAnalitycs = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button
        onPress={onOpen}
        className="ml-4 mb-4 mr-4 rounded-none text-lg font-bold bg-indigo-800 text-white w-44"
      >
        Analitycs
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="indigo-light"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalFooter className="ml-16 mr-16 flex flex-row justify-center">
                <Button
                  color="danger"
                  className="w-64"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button className="w-64 ml-8" color="primary" onPress={onClose}>
                  View Analitycs
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ButtonAnalitycs;
