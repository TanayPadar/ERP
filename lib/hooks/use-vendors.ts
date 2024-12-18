'use client';

import { useState } from 'react';
import { Vendor } from '@/types/vendor';
import { addVendor, updateVendor, deleteVendor } from '@/lib/vendors';
import { toast } from 'sonner';

export function useVendors() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddVendor = async (vendorData: Partial<Vendor>) => {
    setIsLoading(true);
    try {
      const newVendor = addVendor(vendorData);
      toast.success('Vendor created successfully');
      return newVendor;
    } catch (error) {
      toast.error('Failed to create vendor');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateVendor = async (id: number, vendorData: Partial<Vendor>) => {
    setIsLoading(true);
    try {
      const updatedVendor = updateVendor(id, vendorData);
      toast.success('Vendor updated successfully');
      return updatedVendor;
    } catch (error) {
      toast.error('Failed to update vendor');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVendor = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteVendor(id);
      toast.success('Vendor deleted successfully');
    } catch (error) {
      toast.error('Failed to delete vendor');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addVendor: handleAddVendor,
    updateVendor: handleUpdateVendor,
    deleteVendor: handleDeleteVendor,
  };
}