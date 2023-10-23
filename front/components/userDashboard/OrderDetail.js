import { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const order = [
  {
    key: 1,
    compra: "2AWERF45",
    date: "04/06/2023",
    status: "Facturada",
    product: "Laravel",
    price: "34",
    description: "hoola mundo",
    desarrollador: "steve jobs",
  },
  {
    key: 2,
    compra: "2AWERF46",
    date: "04/06/2023",
    status: "Facturada",
    product: "Laravel",
    price: "34",
    description: "hoola mundo",
    desarrollador: "steve jobs",
  },
  {
    key: 3,
    compra: "2AWERF47",
    date: "04/06/2023",
    status: "Facturada",
    product: "Laravel",
    price: "34",
    description: "hoola mundo",
    desarrollador: "steve jobs",
  },
  {
    key: 4,
    compra: "2AWERF48",
    date: "04/06/2023",
    status: "Cancelada",
    product: "Laravel",
    price: "34",
    description: "hoola mundo",
    desarrollador: "steve jobs",
  },
];
const OrderDetail = ({id}) => {
 
  // const router = useRouter();
  //    const { id } = router.query;
     console.log(id);
     const orderDetail = order.filter((o) =>o.key === Number(id))
  console.log(orderDetail);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [size, setSize] = useState("3xl");
  
  const handleOpen = (size) => {
    // setBackdrop(backdrop);
setSize(size)
    onOpen();
  };
 
   return (
     <div>
       <>
         <div className="flex flex-wrap gap-3">
           <Button
             onPress={() => handleOpen(size)}

             className="bg-orange-600 text-white hover:bg-orange-500"
             ml="2"
             radius="none"
            //  backdrop="blur"
           >
             Ver detalles
           </Button>
         </div>
         <Modal isOpen={isOpen} onClose={onClose} >
           <ModalContent>
             {(onClose) => (
               <>
                 <ModalHeader className="flex flex-col gap-1">
                   <h1>
                     Detalle - Orden de compra N°: {orderDetail[0]?.compra}
                   </h1>
                 </ModalHeader>
                 <ModalBody>
                   <h2>Fecha: {orderDetail[0]?.date}</h2>
                   <h2>Estados: {orderDetail[0]?.status}</h2>
                   <h2>Desarrollador: {orderDetail[0]?.desarrollador}</h2>
                   <h2>Producto: {orderDetail[0]?.product}</h2>
                   <h2>Precio: ${orderDetail[0]?.price}</h2>
                   <h2>Descripción: {orderDetail[0]?.description}</h2>
                 </ModalBody>
                 <ModalFooter>
                   <Button color="danger" variant="light" onPress={onClose}>
                     Close
                   </Button>
                 </ModalFooter>
               </>
             )}
           </ModalContent>
         </Modal>
       </>
     </div>
   );
};

export default OrderDetail;
