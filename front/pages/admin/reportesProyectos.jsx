import React, { useState } from "react";
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
  Link
} from "@chakra-ui/react";
import { ExternalLinkIcon, WarningIcon } from "@chakra-ui/icons";
import HeadFooter from "../../components/admin/HeadAndFooter";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/actions/actions";



const projectReportsData = [
  {
    id: 1,
    projectName: "Proyecto A",
    reporter: "Usuario 1",
    reason: "Incumplimiento de plazos",
  },
  {
    id: 2,
    projectName: "Proyecto B",
    reporter: "Usuario 2",
    reason: "Contenido inapropiado",
  },
  {
    id: 3,
    projectName: "Proyecto C",
    reporter: "Usuario 3",
    reason: "Incumplimiento de normas",
  },
  {
    id: 4,
    projectName: "Proyecto D",
    reporter: "Usuario 4",
    reason: "Contenido ofensivo",
  },
  // Agrega más informes de proyectos aquí
];

export default function ProjectReports() {

  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projectsData.projectsFilter);
  React.useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [pdf, setPdf] = useState(null);

  const filteredReports = projectReportsData.filter((report) =>
    report.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Reportes de Proyectos", 10, 10);

    const columns = ["ID", "Proyecto Reportado", "Reportado por", "Razón del Reporte"];
    const data = filteredReports.map((report) => [
      report.id,
      report.projectName,
      report.reporter,
      report.reason,
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
      pdf.save("reportes_de_proyectos.pdf");
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
          Reportes de Proyectos
        </Heading>
        <Flex justify="center" mb="4">
          <Input
            placeholder="Buscar proyecto reportado"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mr="4"
            width="300px"
          />
          <Button colorScheme="purple" size="sm" onClick={generatePDF} mr="4">
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
        </Flex>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Proyecto Reportado</Th>
              <Th>Reportado por</Th>
              <Th>Razón del Reporte</Th>
              <Th>Proyecto</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredReports.map((report) => (
              <Tr key={report.id}>
                <Td>{report.id}</Td>
                <Td>{report.projectName}</Td>
                <Td>{report.reporter}</Td>
                <Td>{report.reason}</Td>
                <Td>
                  <Link href={`project/detail/${projects.id}`} isExternal>
                    {report.projectName} <ExternalLinkIcon mx='2px' />
                  </Link>
                </Td>
                <Td>
                  <Button
                    colorScheme="orange"
                    size="sm"
                    leftIcon={<WarningIcon />}
                    onClick={() => sendWarning(reportItem.id)}
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
}
