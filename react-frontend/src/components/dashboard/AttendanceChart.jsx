import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AttendanceChart({ data }) {
  const limitedData = data.slice(0, 40);

  return (
    <div className="card">
      <div className="card-header">
        <h3>Attendance Patterns</h3>
        <p>Line chart of attendance over school days</p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={limitedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="attendance_count"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}