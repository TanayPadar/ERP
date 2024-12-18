'use client';

import { useState } from 'react';
import { DesignWork } from '@/types/design-work';
import { addDesignWork, updateDesignWork, deleteDesignWork } from '@/lib/design-work';
import { toast } from 'sonner';

export function useDesignWork() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDesignWork = async (workData: Partial<DesignWork>) => {
    setIsLoading(true);
    try {
      const newWork = addDesignWork(workData);
      toast.success('Design work created successfully');
      return newWork;
    } catch (error) {
      toast.error('Failed to create design work');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDesignWork = async (id: number, workData: Partial<DesignWork>) => {
    setIsLoading(true);
    try {
      const updatedWork = updateDesignWork(id, workData);
      toast.success('Design work updated successfully');
      return updatedWork;
    } catch (error) {
      toast.error('Failed to update design work');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDesignWork = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteDesignWork(id);
      toast.success('Design work deleted successfully');
    } catch (error) {
      toast.error('Failed to delete design work');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addDesignWork: handleAddDesignWork,
    updateDesignWork: handleUpdateDesignWork,
    deleteDesignWork: handleDeleteDesignWork,
  };
}