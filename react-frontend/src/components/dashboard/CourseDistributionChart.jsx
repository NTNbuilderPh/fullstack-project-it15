import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const COLORS = [
  "#1d4ed8",
  "#2563eb",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#0f766e",
  "#14b8a6",
  "#f59e0b",
  "#f97316",
  "#ef4444",
];

export default function CourseDistributionChart({ data }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Course Distribution</h3>
        <p>Pie chart of students across courses</p>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <Pie
            data={data}
            dataKey="students"
            nameKey="course"
            outerRadius={115}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}