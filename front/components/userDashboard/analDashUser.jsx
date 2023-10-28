import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";

const AnalDashUser = ({ proj }) => {
  return (
    <div className="ml-8">
      <h2 className="text-black font-bold mt-8 ml-8">Proyectos Totales</h2>
      <Table
        //   aria-label="Example table with client side sorting"
        //   sortDescriptor={list.sortDescriptor}
        //   onSortChange={list.sort}
        className="text-black ml-28 mt-8 w-2/3"
      >
        <TableHeader className="m-4 bg-orange-600 text-white flex flex-row justify-center">
          <TableColumn className="justify-center text-black text-lg">
            Estado
          </TableColumn>
          <TableColumn className="justify-center text-black text-lg">
            Proyectos
          </TableColumn>
          <TableColumn className="justify-center text-black text-lg">
            Vistas
          </TableColumn>
          <TableColumn className="justify-center text-black text-lg">
            Rating
          </TableColumn>
          <TableColumn className="justify-center text-black text-lg">
           Estado
          </TableColumn>
          <TableColumn className="justify-center text-black text-lg">
            Ganancias
          </TableColumn>
        </TableHeader>
        <TableBody
        // items={list.items}
        // isLoading={isLoading}
        // loadingContent={<Spinner label="Loading..." />}
        >
            {proj?.map((p)=>
          <TableRow key={p.id}>
            <TableCell className="m-4 bg-orange-600 text-white flex flex-row justify-center">
              {!p.deletedAt ? "Activo" : "Desactivo"}
            </TableCell>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.views}</TableCell>
            <TableCell>{p.Ratings[0]?.score?p.Ratings[0]?.score : "0"}</TableCell>
            <TableCell>{p.status.toUpperCase()}</TableCell>
            <TableCell>{p.price <=0 ? "Free" : p.price}</TableCell>
                        
          </TableRow>
)};
        </TableBody>
      </Table>
    </div>
  );
};

export default AnalDashUser;
