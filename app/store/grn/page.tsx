'use client';

import { Construction } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function GRNPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="p-6 text-center max-w-md">
        <div className="flex justify-center mb-4">
          <Construction className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Work in Progress</h2>
        <p className="text-muted-foreground">
          The Goods Receipt Note (GRN) management system is currently under development. 
          Check back soon for updates.
        </p>
      </Card>
    </div>
  );
}