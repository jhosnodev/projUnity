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
  Input
} from "@nextui-org/react";

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
];
const rows = [
  {
    key: "1",
    compra: "2AWERF45",
    date: "04/06/2023",
    status: "Facturada",
    product: "Laravel",
    price: "34",
  },
  {
    key: "2",
    compra: "2AWERF45",
    date: "04/06/2023",
    status: "Facturada",
    product: "Laravel",
    price: "34",
  },
  {
    key: "3",
    compra: "2AWERF45",
    date: "04/06/2023",
    status: "Facturada",
    product: "Laravel",
    price: "34",
  },
  {
    key: "4",
    compra: "2AWERF45",
    date: "04/06/2023",
    status: "Cancelada",
    product: "Laravel",
    price: "34",
  },
];

const OrdenesCompra = () => {
    return (
      <div className="ml-20 ">
        <div className="flex flex-row">
          <Select
            variant="underlined"
            label="Estado"
            className="w-32 mt-4 mb-4 text-black"
          >
            <SelectItem>Todos</SelectItem>
            <SelectItem>Facturada</SelectItem>
            <SelectItem>Cancelada</SelectItem>
          </Select>
          <Input
            variant="bordered"
            radius="none"
            label="N° de Compra"
            className="w-64 mt-4 mb-4 text-black ml-8"
            mr="2"
          />
          <button className="w-28 h-14 mt-4 text-zinc-400 ml-2 border-gray-300 border-2 hover:underline text-lg">
            Buscar
          </button>
          <button className="w-56 h-14 mt-4 text-zinc-400 ml-72 border-gray-300 border-2 bg-slate-200 hover:underline text-lg">
            Descargar
          </button>
        </div>
        <Table className="w-10/12 border-slate-300 text-black" radius="none">
          <TableHeader
            columns={columns}
            className="text-black"
            radius="none"
            fullWidth="true"
          >
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
};

export default OrdenesCompra;



