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

import { TrendingUp, TrendingDown, ChevronDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartData } from "@/types/chart";
import { useChartExport } from "../../hooks/use-chart-export";
import { ExportDropdown } from "../ui/export-dropdown";

function BarChartComponent({ data }: { data: ChartData }) {
  const { exportRef, exportToPNG, exportToPDF } = useChartExport();
  const dataKey = Object.keys(data.chartConfig)[0];

  // Calculate the maximum value for the y-axis
  const maxValue = Math.max(...data.data.map((item) => item[dataKey]));
  // Round up to the nearest thousand/million for better readability
  const yAxisMax = Math.ceil(maxValue * 1.1);

  // Format large numbers - fixed to match expected type signature
  const formatYAxis = (value: any, index: number): string => {
    const numValue = Number(value);
    if (numValue >= 1000000) {
      return `${(numValue / 1000000).toFixed(1)}M`;
    } else if (numValue >= 1000) {
      return `${(numValue / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{data.config.title}</CardTitle>
        <CardDescription>{data.config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={exportRef} className="h-[400px] w-full bg-white p-4">
          <ChartContainer config={data.chartConfig}>
            <BarChart
              accessibilityLayer
              data={data.data}
              margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey={data.config.xAxisKey}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  return value.length > 20
                    ? `${value.substring(0, 17)}...`
                    : value;
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                domain={[0, yAxisMax]}
                tickCount={6}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey={dataKey}
                fill={`var(--color-${dataKey})`}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
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

export default BarChartComponent;
