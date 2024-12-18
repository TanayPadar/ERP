```typescript
'use client';

import { useState } from 'react';
import { WorkshopData } from '@/types/workshop-data';
import { addWorkshopData, updateWorkshopData, deleteWorkshopData } from '@/lib/workshop-data';
import { toast } from 'sonner';

export function useWorkshopData() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddWorkshopData = async (data: Partial<WorkshopData>) => {
    setIsLoading(true);
    try {
      const newData = addWorkshopData(data);
      toast.success('Workshop data created successfully');
      return newData;
    } catch (error) {
      toast.error('Failed to create workshop data');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateWorkshopData = async (id: number, data: Partial<WorkshopData>) => {
    setIsLoading(true);
    try {
      const updatedData = updateWorkshopData(id, data);
      toast.success('Workshop data updated successfully');
      return updatedData;
    } catch (error) {
      toast.error('Failed to update workshop data');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWorkshopData = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteWorkshopData(id);
      toast.success('Workshop data deleted successfully');
    } catch (error) {
      toast.error('Failed to delete workshop data');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addWorkshopData: handleAddWorkshopData,
    updateWorkshopData: handleUpdateWorkshopData,
    deleteWorkshopData: handleDeleteWorkshopData,
  };
}
```