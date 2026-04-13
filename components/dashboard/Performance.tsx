"use client";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { MoreHorizontal } from "lucide-react";

const data = [
  { name: "Group A", value: 92, fill: "var(--theme-primary-light)" },
  { name: "Group B", value: 8, fill: "var(--theme-accent)" },
];

const Performance = () => {
  return (
    <div className="p-4 rounded-md h-80 relative" style={{ backgroundColor: "var(--theme-surface)" }}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold" style={{ color: "var(--theme-text)" }}>Performance</h1>
        <MoreHorizontal size={16} style={{ color: "var(--theme-text-secondary)" }} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold" style={{ color: "var(--theme-text)" }}>9.2</h1>
        <p className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>of 10 max LTS</p>
      </div>
      <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center" style={{ color: "var(--theme-text)" }}>1st Semester - 2nd Semester</h2>
    </div>
  );
};

export default Performance;
