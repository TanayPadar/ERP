'use client';

import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { Machine } from '@/types/machine';
import { MachineDialog } from '../machine-dialog';
import { useMachines } from '@/lib/hooks/use-machines';

interface MachineActionsProps {
  machine: Machine;
  onUpdate: (id: number, data: Partial<Machine>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function MachineActions({ machine, onUpdate, onDelete }: MachineActionsProps) {
  const { isLoading } = useMachines();

  return (
    <div className="flex justify-end gap-2">
      <MachineDialog
        machine={machine}
        onSave={(data) => onUpdate(machine.id, data)}
        isLoading={isLoading}
        trigger={
          <Button variant="ghost" size="icon">
            <Edit2 className="h-4 w-4" />
          </Button>
        }
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(machine.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}