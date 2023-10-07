import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const topSellingUsersData = [
  { user: "Usuario 1", ventas: 2000 },
  { user: "Usuario 2", ventas: 1800 },
  { user: "Usuario 3", ventas: 1500 },
  // Agrega datos para los usuarios restantes
];

const TopSellingUsersChart = () => {
  return (
    <Box p="4" bg="white" boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" rounded="lg" fontWeight="500">
      <Text fontSize="lg" mb="4">Usuarios que Más Venden</Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topSellingUsersData}>
          <XAxis dataKey="user" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="ventas" name="Ventas" fill="#9a79ba" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TopSellingUsersChart;
