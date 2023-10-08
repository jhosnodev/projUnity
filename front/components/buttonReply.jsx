import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export const ButtonReply = ({name}) => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   return (
     <div>
       <Button
         onPress={onOpen}
         className="mb-4 mr-4  w-24 rounded-none"
         color="primary"
       >
         Reply
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
                 Reply to {name}
               </ModalHeader>
               <ModalFooter>
                 <Button color="danger" variant="light" onPress={onClose}>
                   Close
                 </Button>
                 <Button color="primary" onPress={onClose}>
                   Reply
                 </Button>
               </ModalFooter>
             </>
           )}
         </ModalContent>
       </Modal>
     </div>
   );
};

export default ButtonReply;
