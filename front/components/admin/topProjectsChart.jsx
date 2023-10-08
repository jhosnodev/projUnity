import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const topProjectsData = [
  { project: "Proyecto 1", ventas: 150 },
  { project: "Proyecto 2", ventas: 120 },
  { project: "Proyecto 3", ventas: 100 },
  // Agrega datos para los proyectos restantes
];

const TopProjectsChart = () => {
  return (
    <Box p="4" bg="white" boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" rounded="lg" fontWeight="500">
      <Text fontSize="lg" mb="4">Proyectos Más Vendidos</Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topProjectsData}>
          <XAxis dataKey="project" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="ventas" name="Ventas" fill="#758BFD" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TopProjectsChart;
