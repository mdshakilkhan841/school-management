"use client";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import { UsersRound } from "lucide-react";


const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    {
      name: "Total",
      count: boys+girls,
      fill: "white",
    },
    {
      name: "Girls",
      count: girls,
      fill: "var(--theme-accent)",
    },
    {
      name: "Boys",
      count: boys,
      fill: "var(--theme-primary-light)",
    },
  ];
  return (
    <div className="relative w-full h-[75%]">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={32}
          data={data}
        >
          <RadialBar background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <UsersRound size={50} style={{ color: "var(--theme-text-secondary)" }} />
      </div>
    </div>
  );
};

export default CountChart;
