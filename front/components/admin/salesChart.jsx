import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const salesData = [
//   { month: "Enero", ventas: 1000 },
//   { month: "Febrero", ventas: 1500 },
//   { month: "Marzo", ventas: 2000 },
//   // Agrega datos para los meses restantes
// ];

const SalesChart = ({userDashboardData}) => {
  return (
    <Box p="4" bg="white" boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" rounded="lg" fontWeight="500" >
      <Text fontSize="lg" mb="4">Ventas Mensuales</Text>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={userDashboardData.salesData}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ventas" name="Ventas" stroke="#758BFD" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SalesChart;
