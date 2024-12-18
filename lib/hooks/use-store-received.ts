```typescript
'use client';

import { useState } from 'react';
import { StoreReceived } from '@/types/store-received';
import { addStoreReceipt, updateStoreReceipt, deleteStoreReceipt } from '@/lib/store-received';
import { toast } from 'sonner';

export function useStoreReceived() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddStoreReceipt = async (receiptData: Partial<StoreReceived>) => {
    setIsLoading(true);
    try {
      const newReceipt = addStoreReceipt(receiptData);
      toast.success('Store receipt created successfully');
      return newReceipt;
    } catch (error) {
      toast.error('Failed to create store receipt');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStoreReceipt = async (id: number, receiptData: Partial<StoreReceived>) => {
    setIsLoading(true);
    try {
      const updatedReceipt = updateStoreReceipt(id, receiptData);
      toast.success('Store receipt updated successfully');
      return updatedReceipt;
    } catch (error) {
      toast.error('Failed to update store receipt');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStoreReceipt = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteStoreReceipt(id);
      toast.success('Store receipt deleted successfully');
    } catch (error) {
      toast.error('Failed to delete store receipt');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addStoreReceipt: handleAddStoreReceipt,
    updateStoreReceipt: handleUpdateStoreReceipt,
    deleteStoreReceipt: handleDeleteStoreReceipt,
  };
}
```