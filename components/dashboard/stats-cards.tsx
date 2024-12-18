'use client';

import { Card } from '@/components/ui/card';

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4 sm:p-6">
        <h3 className="text-sm font-semibold mb-2">Total Projects</h3>
        <p className="text-2xl sm:text-3xl font-bold">24</p>
      </Card>
      <Card className="p-4 sm:p-6">
        <h3 className="text-sm font-semibold mb-2">Active Orders</h3>
        <p className="text-2xl sm:text-3xl font-bold">12</p>
      </Card>
      <Card className="p-4 sm:p-6">
        <h3 className="text-sm font-semibold mb-2">Pending Tasks</h3>
        <p className="text-2xl sm:text-3xl font-bold">8</p>
      </Card>
      <Card className="p-4 sm:p-6">
        <h3 className="text-sm font-semibold mb-2">Revenue</h3>
        <p className="text-2xl sm:text-3xl font-bold">$45.2K</p>
      </Card>
    </div>
  );
}