'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Info } from 'lucide-react';
import { Machine } from '@/types/machine';
import { machines } from '@/lib/machines';
import { MachineDialog } from './machine-dialog';
import { useState } from 'react';
import { useMachines } from '@/lib/hooks/use-machines';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MachinesTableProps {
  onMachineUpdate: (id: number, data: Partial<Machine>) => Promise<void>;
  onMachineDelete: (id: number) => Promise<void>;
}

function MachineStatusBadge({ status }: { status: Machine['status'] }) {
  const colors = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    Maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

export function MachinesTable({ onMachineUpdate, onMachineDelete }: MachinesTableProps) {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const { isLoading } = useMachines();

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Machine Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Specifications</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {machines.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell className="font-medium">{machine.name}</TableCell>
                <TableCell>{machine.code}</TableCell>
                <TableCell>{machine.type}</TableCell>
                <TableCell>{machine.department}</TableCell>
                <TableCell>{machine.operator}</TableCell>
                <TableCell>
                  <MachineStatusBadge status={machine.status} />
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <p>Make: {machine.specifications?.make}</p>
                          <p>Model: {machine.specifications?.model}</p>
                          <p>Year: {machine.specifications?.year}</p>
                          <p>Capacity: {machine.specifications?.capacity}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <MachineDialog
                      machine={machine}
                      onSave={(data) => onMachineUpdate(machine.id, data)}
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
                      onClick={() => onMachineDelete(machine.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}