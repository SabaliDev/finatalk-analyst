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
import type { ChartData } from "@/types/chart";
import { useChartExport } from "../../hooks/use-chart-export";
import { ExportDropdown } from "../ui/export-dropdown";

function LineChartComponent({ data }: { data: ChartData }) {
  const { exportRef, exportToPNG, exportToPDF } = useChartExport();

  // Format numbers to financial style
  const formatValue = (value: number | string) => {
    if (typeof value === "number") {
      return new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 2,
      }).format(value);
    }
    return value;
  };

  // Get unique metrics from the first data point
  const metrics = data?.data?.[0]
    ? Object.keys(data.data[0]).filter((key) => key !== data.config.xAxisKey)
    : [];

  // Calculate actual trends
  const calculateTrend = () => {
    if (!data?.data || data.data.length < 2) return null;

    const trends = metrics.map((metric) => {
      const firstValue = data.data[0][metric] as number;
      const lastValue = data.data[data.data.length - 1][metric] as number;

      if (firstValue === lastValue) return null;

      const percentageChange = ((lastValue - firstValue) / firstValue) * 100;
      return {
        metric,
        direction: percentageChange > 0 ? "up" : "down",
        percentage: Math.abs(percentageChange).toFixed(2),
      };
    });

    // Filter out null trends (flat lines)
    return trends.filter((trend) => trend !== null);
  };

  const trends = calculateTrend();
  const hasTrends = trends && trends.length > 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {data?.config?.title || "Financial Metrics"}
        </CardTitle>
        <p className="text-sm text-gray-500">
          {data?.config?.description || "Trend analysis"}
        </p>
      </CardHeader>
      <CardContent>
        <div ref={exportRef} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data?.data || []}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-gray-200"
              />
              <XAxis
                dataKey={data?.config?.xAxisKey}
                tick={{ fill: "hsl(var(--foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={formatValue}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
                formatter={formatValue}
              />
              <Legend
                verticalAlign="top"
                wrapperStyle={{
                  paddingBottom: 10,
                  color: "hsl(var(--foreground))",
                  fontWeight: "bold",
                }}
              />
              {metrics.map((metric, index) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={`hsl(var(--chart-${index + 1}))`}
                  strokeWidth={2}
                  dot={{
                    fill: `hsl(var(--chart-${index + 1}))`,
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{ r: 6 }}
                  name={data?.chartConfig?.[metric]?.label || metric}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {hasTrends ? (
          <div className="flex flex-col gap-1">
            {trends.map((trend, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="font-medium">
                  {data?.chartConfig?.[trend.metric]?.label || trend.metric}{" "}
                  trending {trend.direction} by {trend.percentage}%
                </span>
                {trend.direction === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No significant trends detected
          </p>
        )}
        {data?.config?.footer && (
          <p className="text-sm text-gray-500">{data.config.footer}</p>
        )}
         <div className="mt-1">
        <ExportDropdown
          title={data.config.title}
          onExportToPNG={exportToPNG}
          onExportToPDF={exportToPDF}
        />
      </div>
      </CardFooter>
     
    </Card>
  );
}

export default LineChartComponent;
