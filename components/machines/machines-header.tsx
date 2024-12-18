'use client';

import { MachineDialog } from './machine-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Machine } from '@/types/machine';
import { useMachines } from '@/lib/hooks/use-machines';

interface MachinesHeaderProps {
  onMachineAdded?: () => void;
}

export function MachinesHeader({ onMachineAdded }: MachinesHeaderProps) {
  const { addMachine, isLoading } = useMachines();

  const handleMachineAdd = async (machineData: Partial<Machine>) => {
    await addMachine(machineData);
    onMachineAdded?.();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Machines List</h1>
        <p className="text-sm text-muted-foreground">Manage and view all machines</p>
      </div>
      <MachineDialog
        onSave={handleMachineAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Machine
          </Button>
        }
      />
    </div>
  );
}