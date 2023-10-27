import React from "react";
import { useRouter } from "next/router";
import TransactionDetailsPage from "../../components/admin/transactionDetalles";
import HeadFooter from "../../components/admin/HeadAndFooter";

const transactionsData = [
    {
      orderId: "560",
      nombre: "Dario",
      fecha: "22023-10-27 06:42",
      total: "$67.80",
      metodoPago: "Laravel",
      estadoPago: "Created",
    },
    {
      orderId: "559",
      nombre: "Dario",
      fecha: "2023-10-27 06:31",
      total: "$15.00",
      metodoPago: "WooCommerce",
      estadoPago: "Created",
    },
    {
      orderId: "559",
      nombre: "Dario",
      fecha: "2023-10-27 06:31",
      total: "$67.80",
      metodoPago: "Laravel",
      estadoPago: "Created",
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
