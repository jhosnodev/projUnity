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

const data = [
  { name: "Jan", downloads: 0 },
  { name: "Feb", downloads: 2 },
  { name: "March", downloads: 6 },
  { name: "April", downloads: 7 },
  { name: "May", downloads: 12 },
  { name: "Jun", downloads: 0 },
  { name: "July", downloads: 10 },
];
const DownloadCharts = () => {
  // export default class Example extends PureComponent {
  //   static demoUrl = 'https://codesandbox.io/s/line-chart-connect-nulls-sqp96';

  //   render() {
  return (
    <div style={{ width: "100%" }}>
      {/* <ResponsiveContainer width="100%" height={200}>
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
            <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer> */}

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
            dataKey="downloads"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DownloadCharts;
