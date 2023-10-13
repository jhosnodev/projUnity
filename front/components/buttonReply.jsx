import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export const ButtonResponder = ({name}) => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   return (
     <div>
       <Button
         onPress={onOpen}
         className="mb-4 mr-4  w-24 rounded-none"
         color="primary"
       >
         Responder
       </Button>

       <Modal
         isOpen={isOpen}
         onOpenChange={onOpenChange}
         className="indigo-light"
       >
         <ModalContent>
           {(onClose) => (
             <>
               <ModalHeader className="flex flex-col gap-1 items-center">
                 Responder a {name}
               </ModalHeader>
               <ModalFooter>
                 <Button color="danger" variant="light" onPress={onClose}>
                   Cerrar
                 </Button>
                 <Button color="primary" onPress={onClose}>
                   Responder
                 </Button>
               </ModalFooter>
             </>
           )}
         </ModalContent>
       </Modal>
     </div>
   );
};

export default ButtonResponder;
