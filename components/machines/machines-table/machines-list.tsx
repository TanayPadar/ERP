'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { machines } from '@/lib/machines';
import { Machine } from '@/types/machine';
import { MachineStatusBadge } from '../machine-status-badge';
import { MachineActions } from './machine-actions';
import { MachineSpecifications } from './machine-specifications';

interface MachinesListProps {
  onUpdate: (id: number, data: Partial<Machine>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function MachinesList({ onUpdate, onDelete }: MachinesListProps) {
  return (
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
                <MachineSpecifications specifications={machine.specifications} />
              </TableCell>
              <TableCell className="text-right">
                <MachineActions
                  machine={machine}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}