import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Link
} from "@nextui-org/react";

const ButtonEdit = ({id}) => {
// console.log(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button
        onPress={onOpen}
        className="ml-4 mb-4 mr-4 rounded-none text-lg font-bold bg-indigo-800 text-white"
      >
        Editar
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
                ¿Quieres editar este proyecto?
              </ModalHeader>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Link href={`/project/edit/${id}`}>
                  <Button color="primary">Editar</Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ButtonEdit;
