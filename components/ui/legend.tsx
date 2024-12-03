import { Legend, LegendProps } from 'recharts';

interface ChartLegendProps extends Omit<LegendProps, 'ref'> {
  color?: string;
  fontWeight?: string;
  paddingBottom?: number;
}

export function ChartLegend({
  color = 'hsl(var(--foreground))',
  fontWeight = 'bold',
  paddingBottom = 10,
  ...props
}: ChartLegendProps) {
  return (
    <Legend
      {...props}
      wrapperStyle={{
        paddingBottom,
        color,
        fontWeight,
      }}
    />
  );
}