import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select, SelectItem } from "@nextui-org/react";

const data = [
  { name: "Jan 3", views: 5},
  { name: "Feb 4", views: 4 },
  { name: "March 6", views: 62 },
  { name: "April 12", views: 7 },
  { name: "May 3", views: 17 },
  { name: "Jun 27", views: 9 },
  { name: "July 14", views: 26 },
];
const ChartsAnalitycs = () => {
  return (
    <div className="ml-12 mr-12"style={{ width: "3/4" }}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            connectNulls
            type="monotone"
            dataKey="views"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsAnalitycs;
