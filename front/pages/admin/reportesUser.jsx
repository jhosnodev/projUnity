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
  Button,
  Flex,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon, WarningIcon } from '@chakra-ui/icons'
import HeadFooter from "../../components/admin/HeadAndFooter";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/actions/actions";
import Swal from "sweetalert2";
import { getUsers } from "../../redux/actions/actionsDashboard";

const userReportsData = [
  {
    id: 1,
    userQueReporta: "Usuario 4",
    date: "2023-10-02",
    userReported: "Usuario 1",
    reason: "Comportamiento inapropiado",
    project: "Proyecto A",
  },
  {
    id: 2,
    userQueReporta: "Usuario 6",
    date: "2023-10-07",
    userReported: "Usuario 2",
    reason: "Spam",
    project: "Proyecto B",
  },
  {
    id: 3,
    userQueReporta: "Usuario 5",
    date: "2023-10-12",
    userReported: "Usuario 3",
    reason: "Incumplimiento de normas",
    project: "Proyecto C",
  },
  {
    id: 4,
    userQueReporta: "Usuario 2",
    date: "2023-11-22",
    userReported: "Usuario 4",
    reason: "Spam",
    project: "Proyecto A",
  },
  {
    id: 5,
    userQueReporta: "Usuario 1",
    date: "2023-11-30",
    userReported: "Usuario 5",
    reason: "Contenido ofensivo",
    project: "Proyecto B",
  },
  {
    id: 6,
    userQueReporta: "Usuario 3",
    date: "2023-12-05",
    userReported: "Usuario 6",
    reason: "Acoso",
    project: "Proyecto C",
  },
  // Agrega más entradas de reportes aquí
];

export default function ReportesUsuarios() {

  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projectsData.projectsFilter);
  React.useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  
 
  React.useEffect(() => {
    let sesion = JSON.parse(localStorage.getItem("sesion"));
    console.log(sesion)
    if (sesion.id) {
      console.log(sesion.id)
      dispatch(getUsers());
    //   dispatch(getSesion());
    }
  }, [dispatch]);

  const userData = useSelector((state) => state.userDashboard.dataUsers);
  console.log(userData);

  const loading = useSelector((state) => state.userDashboard.loading);
  if (loading) return <Loader />;

  const [pdf, setPdf] = useState(null);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Reportes de Usuarios", 10, 10);

    const columns = ["ID", "Fecha", "Usuario Reportado", "Razón del reporte", "Proyecto"];
    const data = userReportsData.map((reportItem) => [
      reportItem.id,
      reportItem.date,
      reportItem.userReported,
      reportItem.reason,
      reportItem.project,
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
      pdf.save("reportes_de_usuarios.pdf");
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
      <Box m="8">
        <Heading as="h2" size="md">
          Reportes de Usuarios
        </Heading>
        <Flex justify="flex-end" mr="8">
          <Button
            colorScheme="purple"
            size="sm"
            onClick={generatePDF}
            mr="4"
          >
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
              <Th>Denunciante</Th>
              <Th>Fecha</Th>
              <Th>Usuario Reportado</Th>
              <Th>Razón del reporte</Th>
              <Th>Proyecto</Th>
            </Tr>
          </Thead>
          <Tbody bg="gray.200">
            {userReportsData.map((reportItem) => (
              <Tr key={reportItem.id}>
                <Td>{reportItem.id}</Td>
                <Td>{reportItem.userQueReporta}</Td>
                <Td>{reportItem.date}</Td>
                <Td>{reportItem.userReported}</Td>
                <Td>{reportItem.reason}</Td>
                <Td>
                  <Link href={`project/detail/${projects.id}`} isExternal>
                    {reportItem.project} <ExternalLinkIcon mx='2px' />
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
