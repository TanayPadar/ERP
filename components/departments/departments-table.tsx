'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UserStatusBadge } from '@/components/users/user-status-badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { Department } from '@/types/department';
import { departments } from '@/lib/departments';
import { DepartmentDialog } from './department-dialog';
import { useState } from 'react';
import { useDepartments } from '@/lib/hooks/use-departments';

interface DepartmentsTableProps {
  onDepartmentUpdate: (id: number, data: Partial<Department>) => Promise<void>;
  onDepartmentDelete: (id: number) => Promise<void>;
}

export function DepartmentsTable({ onDepartmentUpdate, onDepartmentDelete }: DepartmentsTableProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const { isLoading } = useDepartments();

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Head</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">{department.name}</TableCell>
                <TableCell>{department.code}</TableCell>
                <TableCell>{department.head}</TableCell>
                <TableCell>{department.employees}</TableCell>
                <TableCell>{department.location}</TableCell>
                <TableCell>
                  <UserStatusBadge status={department.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <DepartmentDialog
                      department={department}
                      onSave={(data) => onDepartmentUpdate(department.id, data)}
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
                      onClick={() => onDepartmentDelete(department.id)}
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