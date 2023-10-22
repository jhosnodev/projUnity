import React from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";
import HeadFooter from "../../components/admin/HeadAndFooter";
import { jsPDF } from "jspdf";
import "jspdf-autotable"

const commentsHistoryData = [
  {
    id: 1,
    date: "2023-10-01",
    user: "Usuario 1",
    comment: "Este proyecto es genial.",
  },
  {
    id: 2,
    date: "2023-10-05",
    user: "Usuario 2",
    comment: "¡Gran trabajo en este proyecto!",
  },
  {
    id: 3,
    date: "2023-10-10",
    user: "Usuario 3",
    comment: "Necesita algunas mejoras.",
  },
  {
    id: 4,
    date: "2023-10-15",
    user: "Usuario 4",
    comment: "Excelente comunicación con el cliente.",
  },
  {
    id: 5,
    date: "2023-10-20",
    user: "Usuario 2",
    comment: "Gran colaboración en este proyecto.",
  },
  {
    id: 6,
    date: "2023-10-25",
    user: "Usuario 1",
    comment: "Recomiendo a este usuario, excelente trabajo.",
  },
  {
    id: 7,
    date: "2023-10-30",
    user: "Usuario 3",
    comment: "Necesita mejorar en la comunicación con el equipo.",
  },
  // Agrega más entradas de historial de comentarios aquí
];

export default function CommentsHistory() {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    // Título del documento
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text("Historial de Comentarios", 105, 15, null, null, "center");
  
    // Crea una tabla con los datos de comentarios
    const data = filteredComments.map((comment) => [
      comment.id.toString(),
      comment.date,
      comment.user,
      comment.comment,
    ]);
  
    doc.autoTable({
      startY: 28,
      head: [["ID", "Fecha", "Usuario", "Comentario"]],
      body: data,
    });
  
    // Guarda el documento como un archivo PDF
    doc.save("historial_comentarios.pdf");
  };
  
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredComments = commentsHistoryData.filter((comment) =>
    comment.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <HeadFooter>

    <Box m="6">
      <Heading as="h2" size="lg" mb="4">
        Historial de Comentarios
      </Heading>
      <Flex justify="center" mb="4">
        <Input
          placeholder="Buscar usuario"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mr="4"
          width="300px"
        />
       <Button colorScheme="purple" size="sm" onClick={handleDownloadPDF}>
  Descargar Historial
</Button>

      </Flex>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Fecha</Th>
            <Th>Usuario</Th>
            <Th>Comentario</Th>
          </Tr>
        </Thead>
        <Tbody bg="gray.200">
          {filteredComments.map((comment) => (
            <Tr key={comment.id}>
              <Td>{comment.id}</Td>
              <Td>{comment.date}</Td>
              <Td>{comment.user}</Td>
              <Td>{comment.comment}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
    </HeadFooter>
  );
}
