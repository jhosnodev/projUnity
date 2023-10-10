import React from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Link,
} from "@chakra-ui/react";

const transactionsData = [
  {
    orderId: "12345",
    nombre: "Juan Pérez",
    fecha: "2023-10-15",
    total: "$50.00",
    estadoPago: "Aprobado",
    metodoPago: "Tarjeta de Crédito",
  },
  {
    orderId: "54321",
    nombre: "María González",
    fecha: "2023-10-14",
    total: "$30.00",
    estadoPago: "Denegado",
    metodoPago: "PayPal",
  },
  {
    orderId: "87435",
    nombre: "Fernando Guevara",
    fecha: "2023-08-16",
    total: "$80.00",
    estadoPago: "Pendiente",
    metodoPago: "Mercado Pago",
  },
  // Agrega más transacciones aquí
];

const LatestTransactionsTable = () => {
  return (
    <Box mb="8" mt="8" bg="gray.100">
      <Flex justify="space-between" mb="4">
        <Heading as="h2" size="md">
          Últimas Transacciones
        </Heading>
        <Flex>
          <Input placeholder="Buscar transacción" mr="2" />
          <Select placeholder="Filtrar por método de pago">
            <option value="tarjeta">Tarjeta de Crédito</option>
            <option value="paypal">PayPal</option>
            <option value="mercadopago">Mercado Pago</option>
            {/* Agrega más opciones de métodos de pago aquí */}
          </Select>
        </Flex>
      </Flex>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Order Id</Th>
            <Th>Nombre</Th>
            <Th>Fecha</Th>
            <Th>Total</Th>
            <Th>Estado del Pago</Th>
            <Th>Método de Pago</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactionsData.map((transaction) => (
            <Tr key={transaction.orderId}>
              <Td>{transaction.orderId}</Td>
              <Td>{transaction.nombre}</Td>
              <Td>{transaction.fecha}</Td>
              <Td>{transaction.total}</Td>
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
              <Td>{transaction.metodoPago}</Td>
              <Td>
                <Link href={`/admin/detallesTransaccion?id=${transaction.orderId}`}>
                <Button size="sm" className="bg-gradient-to-tr from-orange-400 to-orange-600 text-white hover:bg-orange-300" ml="2">
                  Ver Detalles
                </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LatestTransactionsTable;
