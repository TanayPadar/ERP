'use client';

import { Card } from '@/components/ui/card';
import { useDesignStats } from '@/hooks/use-design-stats';

export function DesignStats() {
  const stats = useDesignStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Total Enquiries</h3>
        <p className="mt-2 text-3xl font-bold">{stats.totalEnquiries}</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Active Projects</h3>
        <p className="mt-2 text-3xl font-bold">{stats.activeProjects}</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Pending Quotations</h3>
        <p className="mt-2 text-3xl font-bold">{stats.pendingQuotations}</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Design Tasks</h3>
        <p className="mt-2 text-3xl font-bold">{stats.designTasks}</p>
      </Card>
    </div>
  );
}