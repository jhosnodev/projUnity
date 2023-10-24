import React from "react";
import { useRouter } from "next/router";
import TransactionDetailsPage from "../../components/admin/transactionDetalles";
import HeadFooter from "../../components/admin/HeadAndFooter";

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
      metodoPago: "Transferencia Mercado Pago",
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

const DetallesTransaccion = () => {
  const router = useRouter();
  const { id } = router.query; // orderId de la URL

  const transaction = transactionsData.find(
    (transaction) => transaction.orderId === id
  );

  return (
    <HeadFooter>
      <TransactionDetailsPage transaction={transaction} />
    </HeadFooter>
  );
};

export default DetallesTransaccion;
