"use client";

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
import { MoreHorizontal } from "lucide-react";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Sep",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
  },
];

const FinanceChart = () => {
  return (
    <div className="rounded-xl w-full h-full p-4" style={{ backgroundColor: "var(--theme-surface)" }}>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold" style={{ color: "var(--theme-text)" }}>Finance</h1>
        <MoreHorizontal size={20} style={{ color: "var(--theme-text-secondary)" }} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border)" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "var(--theme-text-secondary)" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tick={{ fill: "var(--theme-text-secondary)" }} tickLine={false}  tickMargin={20}/>
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              borderColor: "var(--theme-border)",
              backgroundColor: "var(--theme-surface)",
              color: "var(--theme-text)",
            }}
          />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="var(--theme-primary-light)"
            strokeWidth={5}
          />
          <Line type="monotone" dataKey="expense" stroke="var(--theme-secondary)" strokeWidth={5}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
