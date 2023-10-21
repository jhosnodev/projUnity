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
  Button,
  Input,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import HeadFooter from "../../components/admin/HeadAndFooter";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";

const commentReportsData = [
  {
    id: 1,
    date: "2023-10-05",
    reporter: "Usuario 1",
    comment: "Este comentario es inapropiado",
    usuarioReportado: "Usuario 2"
  },
  {
    id: 2,
    date: "2023-10-10",
    reporter: "Usuario 2",
    comment: "Contenido de spam",
    usuarioReportado: "Usuario 4"
  },
  {
    id: 3,
    date: "2023-10-15",
    reporter: "Usuario 3",
    comment: "Violación de normas de la comunidad",
    usuarioReportado: "Usuario 1"
  },
  {
    id: 4,
    date: "2023-11-10",
    reporter: "Usuario 5",
    comment: "Contenido ofensivo y lenguaje inapropiado.",
    usuarioReportado: "Usuario 3"
  },
  {
    id: 5,
    date: "2023-11-15",
    reporter: "Usuario 6",
    comment: "Spam y enlaces maliciosos.",
    usuarioReportado: "Usuario 2"
  },
  {
    id: 6,
    date: "2023-11-20",
    reporter: "Usuario 7",
    comment: "Acoso y amenazas.",
    usuarioReportado: "Usuario 5"
  },

  // Puedes agregar más informes de comentarios aquí
];

const CommentReports = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pdf, setPdf] = React.useState(null);

  const filteredReports = commentReportsData.filter((report) =>
    report.usuarioReportado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Reportes de Comentarios", 10, 10);

    const columns = ["ID", "Fecha", "Reportado por", "Comentario Reportado"];
    const data = filteredReports.map((report) => [
      report.id,
      report.date,
      report.reporter,
      report.comment,
    ]);

    doc.autoTable({
      head: [columns],
      body: data,
      startY: 20,
    });

    setPdf(doc);
  };

  const downloadPDF = () => {
    if (pdf) {
      pdf.save("reportes_de_comentarios.pdf");
    }
  };

  const sendWarning = (userId) => {
    // Agregar aquí la lógica para enviar una advertencia al usuario
    // En lugar de la alerta nativa, usamos SweetAlert2
    Swal.fire({
      icon: "warning",
      title: "Enviar advertencia al usuario",
      text: `¿Estás seguro de que deseas enviar una advertencia al usuario con ID ${userId}?`,
      showCancelButton: true,
      confirmButtonText: "Sí, enviar advertencia",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes realizar la acción de enviar la advertencia al usuario
        Swal.fire("Éxito", `Advertencia enviada al usuario con ID ${userId}`, "success");
      }
    });
  };

  return (
    <HeadFooter>
      <Box p="4">
        <Heading as="h2" size="lg" mb="4">
          Reportes de Comentarios
        </Heading>
        <Flex justify="center" mb="4" alignItems="center">
          <Button colorScheme="purple" size="sm" onClick={generatePDF} mr="2">
            Generar PDF
          </Button>
          <Button
            colorScheme="purple"
            size="sm"
            onClick={downloadPDF}
            disabled={!pdf}
            style={{
              cursor: pdf ? "pointer" : "default",
              pointerEvents: pdf ? "auto" : "none",
            }}
          >
            Descargar PDF
          </Button>
          <Input
            placeholder="Buscar usuario reportado"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ml="4"
            width="300px"
          />
        </Flex>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Fecha</Th>
              <Th>Reportado por</Th>
              <Th>Comentario Reportado</Th>
              <Th>Usuario Reportado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredReports.map((report) => (
              <Tr key={report.id}>
                <Td>{report.id}</Td>
                <Td>{report.date}</Td>
                <Td>{report.reporter}</Td>
                <Td>{report.comment}</Td>
                <Td>{report.usuarioReportado}</Td>
                <Td>
                  <Button
                    colorScheme="orange"
                    size="sm"
                    leftIcon={<WarningIcon />}
                    onClick={() => sendWarning(report.usuarioReportado)}
                  >
                    Advertir
                  </Button>
                  </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </HeadFooter>
  );
};

export default CommentReports;
