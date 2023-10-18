// import {
//   Button,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   useDisclosure,
// } from "@nextui-org/react";


// export const ButtonFollow = ({ name, handleClick }) => {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   return (
//     <div>
//       <Button
//         onPress={onOpen}
//         className="mb-4 mr-4  w-24 rounded-none"
//         color="primary"
//       >
//         Seguir
//       </Button>

//       <Modal
//         isOpen={isOpen}
//         onOpenChange={onOpenChange}
//         className="indigo-light"
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1 items-center">
//                 Seguir{name}
//               </ModalHeader>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Cerrar
//                 </Button>
//                 <Button color="primary" onOpenChange={handleClick}>
//                   Seguir
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// };

// export default ButtonFollow;
