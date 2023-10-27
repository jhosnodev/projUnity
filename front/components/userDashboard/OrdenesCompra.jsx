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
// import { PDFDownload } from "./PDFDownload";
import { getOrder } from "../../redux/actions/actionsPayments";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import OrderDetail from "./OrderDetail";


const OrdenesCompra = ({name, projects}) => {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const order = useSelector((state) => state.paymentData.payments);

  const orderByuser = order.filter((o) => o.buyer.toUpperCase() === name.toUpperCase())

  const ordersShort = orderByuser.slice(0, 5)
  
//buscar por orden de compra
//   const [compra, setCompra] = useState("");
//   console.log(compra);
// const searchBuy = ordersShort.filter((r) => Number(r.id) === Number(compra));
//   console.log(searchBuy);
  //filtrar por estado de la compra
  // const [filter, setFilter] = useState([])
  // const filterOrders = () => {
    
  // }
  const PDFDownload = () => {
    // Crear un nuevo documento PDF
    const doc = new jsPDF("l");
    doc.setFont("helvetica");
    doc.setFontSize(30);
    doc.text("Orden de compra", 145, 20, null, null, "center");
    //   const imgData = image;
    // doc.addImage(imgData, "PNG", 15, 40, 148, 210);
  // Agregar contenido al PDF

  //    doc.text("Orden de compra", 105, 15, 15, null, "center");
  //   doc.addFont("/fonts/Pompiere-Regular.ttf", "Pompiere", "regular");
  // const data = ordersShort.map((o) => {
  //   o.name, o.status, o.price
  // })
    doc.autoTable({
      startY: 28,
      theme: "striped",
      styles: {
        fontSize: 5,
        overflow: "linebreak",
        cellPadding: 2,
        lineColor: [0, 0, 0],
        lineWidth: 0.2,
      },
      headStyles: {
        valign: "middle",
        halign: "center",
        fontSize: 15,
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.5,
      columnStyles: {
        0: {
          halign: "center",
        },
        1: {
          halign: "center",
        },
        2: {
          halign: "center",
        },
        3: {
          halign: "center",
        },
        4: {
          halign: "center",
        },
        5: {
          halign: "left",
        },
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: 0,
        fontSize: 10,
        minCellHeight: 15,
      },
      head: [
        ["Fecha", "N° Compra", "Estado", "Producto", "Precio", "desarrollador"],
      ],
      // body: [["17/06/2023", "AE345TG", "CANCELADA", "LARAVEL", "$45", "Steve "]
      body: data,
  

    })
   
  // Descargar el PDF
  doc.save("OrdenDeCompra.pdf");
};

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



