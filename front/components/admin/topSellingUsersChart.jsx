import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const topSellingUsersData = [
//   { user: "Usuario 1", ventas: 2000 },
//   { user: "Usuario 2", ventas: 1800 },
//   { user: "Usuario 3", ventas: 1500 },
//   // Agrega datos para los usuarios restantes
// ];

const TopSellingUsersChart = ({userDashboardData}) => {
  return (
    <div className="p-4 mt-6 bg-slate-50 rounded-md shadow-md">
      <Text fontSize="lg" mb="4">Usuarios que Más Venden</Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={userDashboardData.topSellingUsers}>
          <XAxis dataKey="user" />
          <YAxis domain={[0, 1000]}/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="ventas" name="Ventas" fill="#758BFD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopSellingUsersChart;
