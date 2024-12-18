'use client';

import { useState } from 'react';
import { Department } from '@/types/department';
import { addDepartment, updateDepartment, deleteDepartment } from '@/lib/departments';
import { toast } from 'sonner';

export function useDepartments() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDepartment = async (departmentData: Partial<Department>) => {
    setIsLoading(true);
    try {
      const newDepartment = addDepartment(departmentData);
      toast.success('Department created successfully');
      return newDepartment;
    } catch (error) {
      toast.error('Failed to create department');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDepartment = async (id: number, departmentData: Partial<Department>) => {
    setIsLoading(true);
    try {
      const updatedDepartment = updateDepartment(id, departmentData);
      toast.success('Department updated successfully');
      return updatedDepartment;
    } catch (error) {
      toast.error('Failed to update department');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDepartment = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteDepartment(id);
      toast.success('Department deleted successfully');
    } catch (error) {
      toast.error('Failed to delete department');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addDepartment: handleAddDepartment,
    updateDepartment: handleUpdateDepartment,
    deleteDepartment: handleDeleteDepartment,
  };
}