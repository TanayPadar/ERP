'use client';

import { useState } from 'react';
import { Enquiry } from '@/types/enquiry';
import { addEnquiry, updateEnquiry, deleteEnquiry } from '@/lib/enquiries';
import { toast } from 'sonner';

export function useEnquiries() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddEnquiry = async (enquiryData: Partial<Enquiry>) => {
    setIsLoading(true);
    try {
      const newEnquiry = addEnquiry(enquiryData);
      toast.success('Enquiry created successfully');
      return newEnquiry;
    } catch (error) {
      toast.error('Failed to create enquiry');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEnquiry = async (id: number, enquiryData: Partial<Enquiry>) => {
    setIsLoading(true);
    try {
      const updatedEnquiry = updateEnquiry(id, enquiryData);
      toast.success('Enquiry updated successfully');
      return updatedEnquiry;
    } catch (error) {
      toast.error('Failed to update enquiry');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEnquiry = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteEnquiry(id);
      toast.success('Enquiry deleted successfully');
    } catch (error) {
      toast.error('Failed to delete enquiry');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addEnquiry: handleAddEnquiry,
    updateEnquiry: handleUpdateEnquiry,
    deleteEnquiry: handleDeleteEnquiry,
  };
}