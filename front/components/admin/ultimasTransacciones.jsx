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
  Link,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { paymentRecord } from "../../redux/actions/actionsDashboard";
import { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// const transactionsData = [
//   {
//     orderId: "12345",
//     nombre: "Juan Pérez",
//     fecha: "2023-10-15",
//     total: "$50.00",
//     status: "Aprobado",
//     metodoPago: "Tarjeta de Crédito",
//   },
//   {
//     orderId: "54321",
//     nombre: "María González",
//     fecha: "2023-10-14",
//     total: "$30.00",
//     status: "Denegado",
//     metodoPago: "Mercado Pago",
//   },
//   {
//     orderId: "87435",
//     nombre: "Fernando Guevara",
//     fecha: "2023-08-16",
//     total: "$80.00",
//     status: "Pendiente",
//     metodoPago: "Mercado Pago",
//   },
//   // Agrega más transacciones aquí
// ];

const LatestTransactionsTable = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(paymentRecord());
  }, [dispatch]);

  const transactionsData = useSelector((state) => state.userDashboard.payments);

  // ? PAGINATION

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTransactions = transactionsData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(transactionsData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box
      mb="8"
      mt="8"
      rounded="lg"
      p={4}
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      overflow="hidden"
      borderRadius="0.25rem"
      borderWidth="0"
      borderColor="#f6f6f6"
      minW="500px"
      h="var(--bs-card-height)"
      bg="#fff"
    >
      <Flex justify="space-between" mb="4">
        <Heading as="h2" size="md">
          Últimas Transacciones
        </Heading>
        <Flex>
          <Input placeholder="Buscar transacción" mr="2" />
          <Select placeholder="Filtrar por estado de pago">
            <option value="tarjeta">Completo</option>
            <option value="mercadopago">En Proceso</option>
            <option value="mercadopago">Cancelado</option>
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
            <Th>Producto</Th>
            <Th>Estado del Pago</Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayedTransactions.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{transaction.orderNumber}</Td>
              <Td>{transaction.buyer}</Td>
              <Td>{transaction.createdAt}</Td>
              <Td>{transaction.paymentAmount}</Td>
              <Td>{transaction.product}</Td>
              <Td>
                <Badge
                  colorScheme={
                    transaction.status === "completed"
                      ? "green"
                      : transaction.status === "processing"
                      ? "yellow"
                      : "red"
                  }
                >
                  {transaction.status}
                </Badge>
              </Td>
              <Td>
                <Link
                  href={`/admin/detallesTransaccion?id=${transaction.orderNumber}`}
                >
                  <Button colorScheme="purple" size="sm">
                    Ver Detalles
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
        <Flex justifyContent="space-between">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <KeyboardArrowRightIcon />
          </Button>
        </Flex>
    </Box>
  );
};

export default LatestTransactionsTable;
