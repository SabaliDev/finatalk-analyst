// types/chart.ts
export interface ChartConfig {
  [key: string]: {
    label: string;
    stacked?: boolean;
    color?: string;
  };
}

export interface ChartData {
  input: any;
  toolOutput: any;
  chartType: "bar" | "multiBar" | "line" | "pie" | "area" | "stackedArea";
  config: {
    xAxisLabel: string | number | undefined;
    yAxisLabel: string | number | undefined;
    title: string;
    description: string;
    trend?: {
      percentage: number;
      direction: "up" | "down";
    };
    footer?: string;
    totalLabel?: string;
    xAxisKey?: string;
  };
  data: Array<Record<string, any>>;
  chartConfig: ChartConfig;
}
