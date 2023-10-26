import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Select,
  SelectItem,
  Input,
  Link,
  Button
} from "@nextui-org/react";
import { PDFDownload } from "./PDFDownload";
import { getOrder } from "../../redux/actions/actionsPayments";

import OrderDetail from "./OrderDetail";

const columns = [
  {
    key: "compra",
    label: "N° COMPRA",
  },
  {
    key: "date",
    label: "FECHA",
  },
  {
    key: "status",
    label: "ESTADO",
  },
  {
    key: "product",
    label: "PRODUCTO",
  },
  {
    key: "price",
    label: "PRECIO",
  },
  {
    key: "detalle",
    label: "VER DETALLES",
  },
  {
    key: "descarga",
    label: "DESCARGAR PDF",
  },
];
const rows = [
  {
    key: 1,
    compra: "2AWERF45",
    date: "04/06/2023",
    status: "Facturada",
    product: "Laravel",
    price: "34",
  },
  {
    key: 2,
    compra: "2AWERF46",
    date: "04/06/2023",
    status: "Facturada",
    product: "Laravel",
    price: "34",
  },
  {
    key: 3,
    compra: "2AWERF47",
    date: "04/06/2023",
    status: "Facturada",
    product: "Laravel",
    price: "34",
  },
  {
    key: 4,
    compra: "2AWERF48",
    date: "04/06/2023",
    status: "Cancelada",
    product: "Laravel",
    price: "34",
  },
];

const OrdenesCompra = ({name, projects}) => {
console.log(name);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const order = useSelector((state) => state.paymentData.payments);
  console.log(order);
  const orderByuser = order.filter((o) => o.buyer.toUpperCase() === name.toUpperCase())
  console.log(orderByuser);
  const ordersShort = orderByuser.slice(0, 10)
  
//buscar por orden de compra
// const [compra, setCompra] = useState("");
// const searchBuy = ordersShort.filter((r) =>
//   Number(r.id) === Number(compra)
//   );
  
  //filtrar por estado de la compra
  // const [filter, setFilter] = useState([])
  // const filterOrders = () => {
    
  // }


    return (
      <div className="ml-20 mt-8">
        <div className="flex flex-row">
          {/* <Select
            variant="underlined"
            label="Estado"
            className="w-32 mt-4 mb-4 text-black"
          >
            <SelectItem value="All">Todos</SelectItem>
            <SelectItem value="Invoiced">Facturada</SelectItem>
            <SelectItem value="Cancel">Cancelada</SelectItem>
          </Select> */}
          {/* <Input
            variant="bordered"
            radius="none"
            label="N° de Compra"
            className="w-64 mt-4 mb-4 text-black ml-8"
            mr="2"
            onChange={(e) => setCompra(e.target.value)}
          /> */}
          {/* <button className="w-28 h-14 mt-4 text-zinc-400 ml-2 border-gray-300 border-2 hover:underline text-lg">
            Buscar
          </button> */}
        </div>
        <Table className="w-10/12 border-slate-300 text-black" radius="none">
          <TableHeader
            columns={columns}
            className="text-black ml-4"
            radius="none"
            fullWidth="true"
            justify="center"
          >
            {/* {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )} */}
            <TableColumn>FECHA</TableColumn>
            <TableColumn>N° COMPRA</TableColumn>
            <TableColumn>ESTADO</TableColumn>
            <TableColumn>PRODUCTO</TableColumn>
            <TableColumn>PRECIO</TableColumn>
            <TableColumn>DETALLES</TableColumn>
            <TableColumn>DESCARGA</TableColumn>
          </TableHeader>
          <TableBody>
            {/* {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )} */}

            {ordersShort.map((order) => (
              <TableRow>
                <TableCell>{order?.createdAt ?order.createdAt.slice(0,10) : <p>Se desconoce la fecha</p>}</TableCell>
                <TableCell>{order?.id}</TableCell>
                <TableCell>{order?.status.toUpperCase()}</TableCell>
                <TableCell>{order?.product}</TableCell>
                <TableCell>${order?.paymentAmount}</TableCell>

                <TableCell>
                  {/* y <Link href={`/profile/OrderDetail?id=${order.key}`}> */}
                  {/* <Button
                      size="sm"
                      className="bg-orange-600 text-white hover:bg-orange-500"
                      ml="2"
                      radius="none"
                      order={order}
                    >
                      Ver Detalles
                    </Button> */}
                  <OrderDetail order={ordersShort} id={order.id} />
                  {/* </Link> */}
                </TableCell>
                <TableCell>
                  <Button
                    colorScheme="purple"
                    size="sm"
                    mr="4"
                    onClick={PDFDownload}
                  >
                    Descargar PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
};

export default OrdenesCompra;



