'use client';

import { useState, useCallback } from 'react';
import { DepartmentsHeader } from '@/components/departments/departments-header';
import { DepartmentsTable } from '@/components/departments/departments-table';
import { DepartmentsFilter } from '@/components/departments/departments-filter';
import { DepartmentFilters } from '@/types/department';
import { useDepartments } from '@/lib/hooks/use-departments';

export default function DepartmentsPage() {
  const [filters, setFilters] = useState<DepartmentFilters>({
    search: '',
    status: 'all',
    rowsPerPage: 10,
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const { updateDepartment, deleteDepartment } = useDepartments();

  const handleDepartmentUpdate = async (id: number, departmentData: any) => {
    await updateDepartment(id, departmentData);
    setRefreshKey(prev => prev + 1);
  };

  const handleDepartmentDelete = async (id: number) => {
    await deleteDepartment(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleDepartmentAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <DepartmentsHeader onDepartmentAdded={handleDepartmentAdded} />
      <DepartmentsFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <DepartmentsTable
        key={refreshKey}
        onDepartmentUpdate={handleDepartmentUpdate}
        onDepartmentDelete={handleDepartmentDelete}
      />
    </div>
  );
}