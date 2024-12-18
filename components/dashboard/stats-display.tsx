'use client';

import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
}

function StatsCard({ title, value }: StatsCardProps) {
  return (
    <Card className="p-4 sm:p-6">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <p className="text-2xl sm:text-3xl font-bold">{value}</p>
    </Card>
  );
}

export function StatsDisplay() {
  const stats = [
    { title: 'Total Projects', value: '24' },
    { title: 'Active Orders', value: '12' },
    { title: 'Pending Tasks', value: '8' },
    { title: 'Revenue', value: '₹45.2K' },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}