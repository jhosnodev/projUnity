// ContactModal.js
import React from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from '@chakra-ui/react';

function ContactModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  return (
    <>
      <Button onClick={onOpen} variant="solid" colorScheme="purple" fontWeight='200'>Contactar</Button>

      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px' />
        <ModalContent>
          <ModalHeader>Deja tu mensaje</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tu nombre</FormLabel>
              <Input placeholder="Tu nombre" ref={initialRef} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Tu mensaje</FormLabel>
              <Textarea placeholder="Tu mensaje" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3}>
              Enviar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ContactModal;
