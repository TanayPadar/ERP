'use client';

import { useState } from 'react';
import { GST } from '@/types/gst';
import { addGST, updateGST, deleteGST } from '@/lib/gst';
import { toast } from 'sonner';

export function useGST() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddGST = async (gstData: Partial<GST>) => {
    setIsLoading(true);
    try {
      const newGST = addGST(gstData);
      toast.success('GST rate created successfully');
      return newGST;
    } catch (error) {
      toast.error('Failed to create GST rate');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateGST = async (id: number, gstData: Partial<GST>) => {
    setIsLoading(true);
    try {
      const updatedGST = updateGST(id, gstData);
      toast.success('GST rate updated successfully');
      return updatedGST;
    } catch (error) {
      toast.error('Failed to update GST rate');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGST = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteGST(id);
      toast.success('GST rate deleted successfully');
    } catch (error) {
      toast.error('Failed to delete GST rate');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addGST: handleAddGST,
    updateGST: handleUpdateGST,
    deleteGST: handleDeleteGST,
  };
}