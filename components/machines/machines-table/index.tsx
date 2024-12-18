'use client';

import { MachinesList } from './machines-list';
import { MachineActions } from './machine-actions';
import { Machine } from '@/types/machine';

interface MachinesTableProps {
  onMachineUpdate: (id: number, data: Partial<Machine>) => Promise<void>;
  onMachineDelete: (id: number) => Promise<void>;
}

export function MachinesTable({ onMachineUpdate, onMachineDelete }: MachinesTableProps) {
  return (
    <div className="border rounded-lg">
      <MachinesList 
        onUpdate={onMachineUpdate}
        onDelete={onMachineDelete}
      />
    </div>
  );
}