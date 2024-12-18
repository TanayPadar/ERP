'use client';

import { Card } from '@/components/ui/card';

interface ChartDataPoint {
  label: string;
  value: number;
}

const data: ChartDataPoint[] = [
  { label: 'Jan', value: 40 },
  { label: 'Feb', value: 30 },
  { label: 'Mar', value: 60 },
  { label: 'Apr', value: 80 },
  { label: 'May', value: 50 },
  { label: 'Jun', value: 70 },
];

export function SimpleChart() {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
      <div className="h-[300px] flex items-end gap-2">
        {data.map((point) => (
          <div key={point.label} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-primary/20 rounded-t"
              style={{ 
                height: `${(point.value / maxValue) * 100}%`,
                transition: 'height 0.3s ease-in-out'
              }}
            />
            <span className="text-sm text-muted-foreground">{point.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}