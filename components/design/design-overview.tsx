'use client';

import { DesignStats } from './design-stats';
import { DesignGrid } from './design-grid';

export function DesignOverview() {
  return (
    <div className="space-y-6">
      <DesignStats />
      <DesignGrid />
    </div>
  );
}