import React from "react";
import LayoutUser from "../../components/layoutUser";
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
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllitems, removeAll } from "../../redux/actions/actionsCarrito";

export default function Index() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllitems());
  }, [dispatch]);

  const projects = useSelector((state) => state.carritoData.carrito);
  const clearAll = () => {
    dispatch(removeAll());
  };

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  /*   console.log(selectedKeys);  */
  const total =
    projects.length > 0
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
      label: "Projectos",
    },
    {
      key: "shortDescription",
      label: "Description",
    },
    {
      key: "price",
      label: "Precio",
    },
  ];
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-6 flex justify-between">
                  <div color="danger" variant="light">
                    <h4>Catidad:</h4> {projects.length}
                  </div>
                  <div color="primary">
                    <h4>Total:</h4> ${total.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button color="danger" variant="light">
                  ❌ Quitar
                </Button>
                <Button color="primary">💲 Comprar</Button>
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
    </LayoutUser>
  );
}
