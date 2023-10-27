import React from "react";
import {
  Box,
  Heading,
  Table,
  Flex,
  Tbody,
  Tr,
  Button,
  Td,
  Badge,
  Link,
} from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"

const TransactionDetailsPage = ({ transaction }) => {
  if (!transaction) {
    // Manejar el caso en que no haya una transacción seleccionada
    return <div>Selecciona una transacción para ver detalles.</div>;
  }
  
  const handleDownloadPDF = () => {
    // Crear un nuevo documento PDF
  const doc = new jsPDF();

    // Agregar contenido al PDF
    doc.text("Detalles de la Transacción", 10, 10);

    const imgData = "./components/PROJUNITY.png"; // Reemplaza con la URL de tu imagen
  doc.addImage(imgData, "PNG", 10, 40, 50, 50);
  
    doc.autoTable({
      head: [["Campo", "Valor"]],
      body: [
        ["Id", transaction.orderId],
        ["Nombre", transaction.nombre],
        ["Fecha", transaction.fecha],
        ["Total", transaction.total],
        ["Producto", transaction.metodoPago],
        ["Estado del Pago", transaction.estadoPago],
      ],
    });

    // Descargar el PDF
    doc.save("DetallesTransaccion.pdf");
  }
  return (
    <Box m="8">
      <Flex justify="space-between" mb="4">
      <Heading as="h2" size="md" ml="2">
        Detalles de la Transacción
      </Heading>
      <Button colorScheme="purple" size="sm" mr="4" onClick={handleDownloadPDF}>
  Descargar PDF
</Button>
      </Flex>
      <Table variant="striped">
        <Tbody bg="gray.300">
          <Tr>
            <Td fontWeight="bold">Id:</Td>
            <Td>{transaction.orderId}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Nombre:</Td>
            <Td>{transaction.nombre}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Fecha:</Td>
            <Td>{transaction.fecha}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Total:</Td>
            <Td>{transaction.total}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Producto:</Td>
            <Td>{transaction.metodoPago}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Estado del Pago:</Td>
            <Td>
              <Badge
                colorScheme={
                  transaction.estadoPago === "Aprobado"
                    ? "green"
                    : transaction.estadoPago === "Pendiente"
                    ? "yellow"
                    : "red"
                }
              >
                {transaction.estadoPago}
              </Badge>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Link href="/admin">
        <Box textAlign="right" m="4">
          <Button colorScheme="orange" borderRadius="lg">
            Volver al Perfil
          </Button>
        </Box>
        </Link>
    </Box>
  );
};

export default TransactionDetailsPage;