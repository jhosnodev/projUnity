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
import { getAllitems, removeAll } from "../../redux/actions/carrito";

export default function Index() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllitems());
  }, [dispatch]);
  const items = useSelector((state) => state.carritoData.carrito);
  const clearAll = () => {
    dispatch(removeAll());
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
                <Table
                  selectionMode="multiple"
                  defaultSelectedKeys={["2", "3"]}
                  aria-label="Carrito de compras"
                >
                  <TableHeader>
                    <TableColumn>Proyecto</TableColumn>
                    <TableColumn>Descripción</TableColumn>
                    <TableColumn>Precio</TableColumn>
                  </TableHeader>
                  <TableBody
                    emptyContent={
                      "Aun no tienes proyecto en tu carrito de compras"
                    }
                  >
                    {" "}
                    {items?.map((item) => (
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
                  <Button color="danger" variant="light">
                    ❌ Quitar
                  </Button>
                  <Button color="primary">💲 Comprar</Button>
                </div>
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
