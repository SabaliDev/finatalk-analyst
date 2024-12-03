"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TrendingUp, TrendingDown, ChevronDown } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useChartExport } from "../hooks/use-chart-export";
import type { ChartData } from "@/types/chart";
import { ExportDropdown } from "./ui/export-dropdown";
import BarChartComponent from "./charts/barchart";
import LineChartComponent from "./charts/linechart";
import PieChartComponent from "./charts/piechart";
import AreaChartComponent from "./charts/areachart";



function MultiBarChartComponent({ data }: { data: ChartData }) {
  // Determine the main data key for the bars
  const dataKey = Object.keys(data.chartConfig)[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{data.config.title}</CardTitle>
        <CardDescription>{data.config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={data.chartConfig}>
              <BarChart
                data={data.data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={data.config.xAxisKey}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  label={{
                    position: "insideBottom",
                    offset: -10,
                    style: { fill: "hsl(var(--foreground))" },
                  }}
                  tickFormatter={(value) =>
                    value.length > 20 ? `${value.substring(0, 17)}...` : value
                  }
                />
                <YAxis
                  label={{
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      textAnchor: "middle",
                      fill: "hsl(var(--foreground))",
                      fontWeight: "bold",
                    },
                  }}
                  tick={{ fill: "hsl(var(--foreground))" }}
                  tickLine={{ stroke: "hsl(var(--border))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{
                    paddingBottom: 10,
                    color: "hsl(var(--foreground))",
                    fontWeight: "bold",
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey={dataKey}
                  fill={`var(--color-${dataKey})`}
                  radius={8}
                  label={{ position: "top", fill: "var(--foreground-color)" }}
                />
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {data.config.trend && (
          <div className="flex gap-2 font-medium leading-none">
            Trending {data.config.trend.direction} by{" "}
            {data.config.trend.percentage}% this period{" "}
            {data.config.trend.direction === "up" ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
          </div>
        )}
        {data.config.footer && (
          <div className="leading-none text-muted-foreground">
            {data.config.footer}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}






export function ChartRenderer({ data }: { data: ChartData }) {
  switch (data.chartType) {
    case "bar":
      return <BarChartComponent data={data} />;
    case "multiBar":
      return <MultiBarChartComponent data={data} />;
    case "line":
      return <LineChartComponent data={data} />;
    case "pie":
      return <PieChartComponent data={data} />;
    case "area":
      return <AreaChartComponent data={data} />;
    case "stackedArea":
      return <AreaChartComponent data={data} stacked />;
    default:
      return null;
  }
}
