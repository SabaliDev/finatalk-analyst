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
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useChartExport } from "../../hooks/use-chart-export";
import { ExportDropdown } from "../ui/export-dropdown";
import type { ChartData } from "@/types/chart";
import { TrendingDown, TrendingUp } from "lucide-react";

function AreaChartComponent({
  data,
  stacked,
}: {
  data: ChartData;
  stacked?: boolean;
}) {
  const { exportRef, exportToPNG, exportToPDF } = useChartExport();

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl">{data.config.title}</CardTitle>
        <CardDescription>{data.config.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height={300}>
          <div ref={exportRef}>
            <ChartContainer config={data.chartConfig}>
              <AreaChart
                data={data.data}
                margin={{ left: 12, right: 12, top: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey={data.config.xAxisKey}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                >
                  <Label
                    value={data.config.xAxisLabel}
                    offset={-10}
                    position="insideBottom"
                  />
                </XAxis>
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.toLocaleString()}
                >
                  <Label
                    value={data.config.yAxisLabel}
                    angle={-90}
                    position="insideLeft"
                  />
                </YAxis>
                <Tooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent indicator={stacked ? "dot" : "line"} />
                  }
                />
                {Object.keys(data.chartConfig).map((key) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    name={data.chartConfig[key].label}
                    fill={data.chartConfig[key].color || "#8884d8"}
                    fillOpacity={0.4}
                    stroke={data.chartConfig[key].color || "#8884d8"}
                    stackId={stacked ? "a" : undefined}
                  />
                ))}
                <Legend
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{ paddingTop: 10 }}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {data.config.trend && (
          <div className="flex items-center gap-2 font-medium leading-none">
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
          <div className="leading-none text-muted-foreground mt-12">
            {data.config.footer}
          </div>
        )}
        <div className="mt-10">
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

export default AreaChartComponent;
