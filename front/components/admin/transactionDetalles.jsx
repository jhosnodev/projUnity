import React from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from "@chakra-ui/react";

const TransactionDetailsPage = ({ transaction }) => {
  if (!transaction) {
    // Manejar el caso en que no haya una transacción seleccionada
    return <div>Selecciona una transacción para ver detalles.</div>;
  }

  return (
    <Box mb="8" mt="8">
      <Heading as="h2" size="md">
        Detalles de la Transacción
      </Heading>
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
          <Tr>
            <Td fontWeight="bold">Método de Pago:</Td>
            <Td>{transaction.metodoPago}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default TransactionDetailsPage;
