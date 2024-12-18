'use client';

import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { Machine } from '@/types/machine';

interface MachineSpecificationsProps {
  specifications?: Machine['specifications'];
}

export function MachineSpecifications({ specifications }: MachineSpecificationsProps) {
  if (!specifications) return null;

  return (
    <Button 
      variant="ghost" 
      size="icon"
      title={`Make: ${specifications.make}\nModel: ${specifications.model}\nYear: ${specifications.year}\nCapacity: ${specifications.capacity}`}
    >
      <Info className="h-4 w-4" />
    </Button>
  );
}