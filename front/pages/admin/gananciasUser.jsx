import React from "react";
import {
  Box,
  Text,
  Button,
  Heading,
  Divider,
  Table,
  Tbody,
  Tr,
  Td,
  Link
} from "@chakra-ui/react";
import HeadFooter from "../../components/admin/HeadAndFooter";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const diasDeVenta = [
  {
    fecha: "2023-10-01",
    proyectosVendidos: 5,
    ganancias: 500, // Ganancias en dólares
  },
  {
    fecha: "2023-10-05",
    proyectosVendidos: 3,
    ganancias: 300,
  },
  {
    fecha: "2023-10-12",
    proyectosVendidos: 7,
    ganancias: 700,
  },
  // Agrega más días y detalles aquí
];

export default function GananciasView() {
  // Preparar datos para el gráfico de barras
  const data = [];
  for (let day = 1; day <= 31; day++) {
    const fecha = `2023-10-${day < 10 ? "0" + day : day}`;
    const proyectosVendidos = Math.floor((day / 31) * 100); // De 0 a 100 proyectos vendidos
    const ganancias = proyectosVendidos * 10; // Suponiendo $10 por proyecto
    data.push({ fecha, proyectosVendidos, ganancias });
  }

  // Función para calcular el total de proyectos vendidos en el mes
  function calcularTotalProyectos(diasDeVenta) {
    let total = 0;
    for (const detalle of diasDeVenta) {
      total += detalle.proyectosVendidos;
    }
    return total;
  }
  return (
    <HeadFooter>
      <Box
        m="6"
        h="var(--bs-card-height)"
        bg="#fff"
      >
        <Box p="4" bg="customLightPurple" fontWeight="600">
          <Heading as="h2" size="lg">
            Detalles de las ganancias del Usuario del Mes
          </Heading>
        </Box>
        <Divider />
        <Box p="4">
          <Text fontSize="lg" fontWeight="500">
            Total de Proyectos Vendidos este Mes:{" "}
            {calcularTotalProyectos(diasDeVenta)}
          </Text>
          <Text fontSize="md" mt="2">
            Aquí puedes encontrar información detallada sobre los días en que
            vendió proyectos.
          </Text>
          <Table variant="striped">
            <Tbody>
              {diasDeVenta.map((detalle, index) => (
                <Tr key={index}>
                  <Td>{detalle.fecha}</Td>
                  <Td>{detalle.proyectosVendidos} proyectos vendidos</Td>
                  <Td>Ganancias: ${detalle.ganancias}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box mt="4">
            <LineChart width={600} height={300} data={data}>
              <XAxis dataKey="fecha" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="proyectosVendidos"
                stroke="#8884d8"
                name="Proyectos Vendidos"
              />
              <Line
                type="monotone"
                dataKey="ganancias"
                stroke="#82ca9d"
                name="Ganancias"
              />
            </LineChart>
          </Box>
        </Box>
        <Link href="/admin">
        <Box textAlign="right" m="4">
          <Button colorScheme="orange" borderRadius="lg" m="4">
            Volver al Perfil
          </Button>
        </Box>
        </Link>
      </Box>
    </HeadFooter>
  );
}

