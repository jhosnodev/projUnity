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


import { useState } from "react";

export default function TableTotalProj () {
//   const [isLoading, setIsLoading] = useState(true);

//   let list = useAsyncList({
//     async load({ signal }) {
//       let res = await fetch("https://swapi.py4e.com/api/people/?search", {
//         signal,
//       });
//       let json = await res.json();
//       setIsLoading(false);

//       return {
//         items: json.results,
//       };
//     },
//     async sort({ items, sortDescriptor }) {
//       return {
//         items: items.sort((a, b) => {
//           let first = a[sortDescriptor.column];
//           let second = b[sortDescriptor.column];
//           let cmp =
//             (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

//           if (sortDescriptor.direction === "descending") {
//             cmp *= -1;
//           }

//           return cmp;
//         }),
//       };
//     },
//   });

    return (
    
        <Table
          //   aria-label="Example table with client side sorting"
          //   sortDescriptor={list.sortDescriptor}
          //   onSortChange={list.sort}
          className="text-black ml-28 mt-8 w-2/3"
        >
          <TableHeader className="m-4 bg-orange-600 text-white flex flex-row justify-center">
            <TableColumn className="justify-center text-black text-lg">Estado</TableColumn>
            <TableColumn className="justify-center text-black text-lg">Proyectos</TableColumn>
            <TableColumn className="justify-center text-black text-lg">Vistas</TableColumn>
            <TableColumn className="justify-center text-black text-lg">Descargas</TableColumn>
            <TableColumn className="justify-center text-black text-lg">Ganancias</TableColumn>
            <TableColumn className="justify-center text-black text-lg">Pagos</TableColumn>
            <TableColumn className="justify-center text-black text-lg">Clasificación</TableColumn>
          </TableHeader>
          <TableBody
          // items={list.items}
          // isLoading={isLoading}
          // loadingContent={<Spinner label="Loading..." />}
          >
            <TableRow>
              <TableCell className="m-4 bg-orange-600 text-white flex flex-row justify-center">
                Activo
              </TableCell>
              <TableCell>Laravel</TableCell>
              <TableCell>100</TableCell>
              <TableCell>39</TableCell>
              <TableCell>$9</TableCell>
              <TableCell>$50</TableCell>
              <TableCell>7/10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="m-4 bg-orange-600 text-white flex flex-row justify-center">
                Activo
              </TableCell>
              <TableCell>Rick and Morty</TableCell>
              <TableCell>240</TableCell>
              <TableCell>50</TableCell>
              <TableCell>$200</TableCell>
              <TableCell>$250</TableCell>
              <TableCell>9/10</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      
    );
}

