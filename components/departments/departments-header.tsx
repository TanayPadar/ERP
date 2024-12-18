'use client';

import { DepartmentDialog } from './department-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Department } from '@/types/department';
import { useDepartments } from '@/lib/hooks/use-departments';

interface DepartmentsHeaderProps {
  onDepartmentAdded?: () => void;
}

export function DepartmentsHeader({ onDepartmentAdded }: DepartmentsHeaderProps) {
  const { addDepartment, isLoading } = useDepartments();

  const handleDepartmentAdd = async (departmentData: Partial<Department>) => {
    await addDepartment(departmentData);
    onDepartmentAdded?.();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Departments</h1>
        <p className="text-sm text-muted-foreground">Manage company departments and structure</p>
      </div>
      <DepartmentDialog
        onSave={handleDepartmentAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Department
          </Button>
        }
      />
    </div>
  );
}