import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const topProjectsData = [
//   { project: "Proyecto 1", ventas: 150 },
//   { project: "Proyecto 2", ventas: 120 },
//   { project: "Proyecto 3", ventas: 100 },
//   // Agrega datos para los proyectos restantes
// ];

const TopProjectsChart = ({userDashboardData}) => {
  return (
    <div className="p-4 mt-6 bg-slate-50 rounded-md shadow-md">
      <Text fontSize="lg" mb="4">Proyectos Más Vendidos</Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={userDashboardData.topProjectsData}>
          <XAxis dataKey="project" />
          <YAxis domain={[0, 20]}/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="ventas" name="Ventas" fill="#758BFD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProjectsChart;
