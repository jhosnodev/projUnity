import React from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const topRankedProjectsData = [
  { project: "Proyecto 1", ranking: 4.5 },
  { project: "Proyecto 2", ranking: 4.8 },
  { project: "Proyecto 3", ranking: 4.2 },
  // Agrega datos para los proyectos rankeados restantes
];

const TopRankedProjectsChart = () => {
  return (
    <Box p="4" bg="white" boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" rounded="lg" fontWeight="500">
      <Text fontSize="lg" mb="4">
        Proyectos Más Rankeados
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topRankedProjectsData}>
          <XAxis dataKey="project" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="ranking" name="Ranking" fill="#758BFD" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TopRankedProjectsChart;
