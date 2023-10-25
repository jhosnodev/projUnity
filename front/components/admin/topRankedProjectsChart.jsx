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

// const topRankedProjectsData = [
//   { project: "Proyecto 1", ranking: 4.5 },
//   { project: "Proyecto 2", ranking: 4.8 },
//   { project: "Proyecto 3", ranking: 4.2 },
//   // Agrega datos para los proyectos rankeados restantes
// ];

const TopRankedProjectsChart = ({userDashboardData}) => {
  return (
    <div className="p-4 mt-6 bg-slate-50 rounded-md shadow-md">
      <Text fontSize="lg" mb="4">
        Proyectos Más Rankeados
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={userDashboardData.topRankedProjectsData}>
          <XAxis dataKey="project" />
          <YAxis domain={[0, 10]}/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="ranking" name="Ranking" fill="#758BFD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopRankedProjectsChart;
