import React from "react";
import LayoutUser from "../../components/layout/layoutUser";
import Head from "next/head";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllitems,
  removeAll,
  removeItem,
  checkout,
} from "../../redux/actions/actionsCarrito";
import { SiMercadopago } from "react-icons/si";
import { getSesion } from "../../redux/actions/actionsUser";
import Swal from "sweetalert2";


export default function Index() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllitems());
    dispatch(getSesion());
  }, [dispatch]);

  const projects = useSelector((state) => state.carritoData.carrito);
  const clearAll = () => {
    dispatch(removeAll());
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  /*   console.log(selectedKeys);  */
  const total =
    projects?.length > 0
      ? projects.reduce(function (accumulator, currentValue) {
          return accumulator + parseFloat(currentValue.price);
        }, 0)
      : parseFloat(0);
  console.log(total);
  const columns = [
    /*     {
      key: "image",
      label: "Imagen",
    }, */
    {
      key: "name",
      label: "Proyectos",
    },
    {
      key: "shortDescription",
      label: "Descripción",
    },
    {
      key: "price",
      label: "Precio",
    },
    {
      key: "actions",
      label: "Acciones",
    },
  ];

  const handleRemoveItem = (id) => {
    console.log(id);
    removeItem(id);
    dispatch(getAllitems());
  };
  const userID = useSelector((state) => state.usersData.sesion);
  const handlePayment = () => {
    if (typeof userID?.id === "undefined") {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión para seguir con la compra",
        footer: '<a href="/auth/login">Por que no te loggeas primero?</a>',
      });
    } else {
      dispatch(checkout(projects, userID));
    }
  };

  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | Mi coleccion</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="flex flex-wrap items-center justify-center">
        <main className="bg-background-100 pb-11 min-h-screen  w-12/12 md:w-8/12 p-11">
          <Tabs variant="bordered" aria-label="Tabs variants">
            <Tab key="cart" title="Tu carrito">
              <div className="flex flex-row justify-between pt-6 pb-4">
                <h2>Carrito de compras</h2>{" "}
                <Button color="danger" variant="light" onPress={clearAll}>
                  Quitar todo
                </Button>
              </div>
              <div>
                {/*           defaultSelectedKeys={["2", "3"]} */}
                {/*   selectionMode="multiple" */}
                <Table
                  aria-label="Carrito de compras"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                >
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    emptyContent={
                      "Aun no tienes proyecto en tu carrito de compras"
                    }
                    items={projects}
                  >
                    {/*          {" "}
                    {(project) => (
                      <TableRow key={project.id}>
                        {(columnKey) => (
                          <TableCell>
                            {getKeyValue(project, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )} */}
                    {projects?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {" "}
                          <User
                            name={item.name}
                            classNames={{
                              name: "text-default-600",
                              description: "text-default-500",
                            }}
                            avatarProps={{
                              size: "sm",
                              src: `${item.image}`,
                            }}
                          />
                        </TableCell>
                        <TableCell>{item.shortDescription}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell
                          onClick={() => deleteItem(item.id)}
                          className="cursor-pointer"
                        >
                          {" "}
                          <Tooltip
                            content={`Eliminar ${item.name}`}
                            placement="right-end"
                          >
                            <Button
                              color="danger"
                              variant="ghost"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              ❌ Eliminar
                            </Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-6 flex justify-between">
                  <div
                    color="danger"
                    variant="light"
                    className="flex flex-row gap-2"
                  >
                    <h4>Cantidad:</h4> {projects?.length}
                  </div>
                  <div color="primary" className="flex flex-row  gap-2">
                    <h4>Total:</h4> ${total.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end w-full">
                {/*       <Button color="danger" variant="light">
                  ❌ Quitar
                </Button> */}
                <Button
                  color="primary"
                  className="justify-self-end"
                  onPress={onOpen}
                >
                  💲 Comprar
                </Button>
              </div>
            </Tab>
            <Tab key="compras" title="Tus Compras">
              <div>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </div>
              {/*           <Card>
            <CardBody>

            </CardBody>
          </Card>  */}
            </Tab>
            <Tab key="donaciones" title="Donaciones">
              <Card>
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </main>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmación de compra
              </ModalHeader>
              <ModalBody className="flex flex-col w-full justify-start">
                {projects?.map((item) => (
                  <div key={item.id} className="flex flex-row justify-between">
                    <User
                      name={item.name}
                      classNames={{
                        name: "text-default-600",
                        description: "text-default-500",
                      }}
                      avatarProps={{
                        size: "sm",
                        src: `${item.image}`,
                      }}
                    />
                    <b>{item.price}</b>
                  </div>
                ))}
                <Divider className="my-4" />
                <div className="self-end">
                  Total: <b>{total}</b>{" "}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={() => handlePayment()}>
                  Pagar con <SiMercadopago /> MercadoPago
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </LayoutUser>
  );
}
