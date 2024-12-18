'use client';

import { useState } from 'react';
import { StoreIssue } from '@/types/store-issue';
import { addStoreIssue, updateStoreIssue, deleteStoreIssue } from '@/lib/store-issues';
import { toast } from 'sonner';

export function useStoreIssues() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddStoreIssue = async (issueData: Partial<StoreIssue>) => {
    setIsLoading(true);
    try {
      const newIssue = addStoreIssue(issueData);
      toast.success('Store issue created successfully');
      return newIssue;
    } catch (error) {
      toast.error('Failed to create store issue');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStoreIssue = async (id: number, issueData: Partial<StoreIssue>) => {
    setIsLoading(true);
    try {
      const updatedIssue = updateStoreIssue(id, issueData);
      toast.success('Store issue updated successfully');
      return updatedIssue;
    } catch (error) {
      toast.error('Failed to update store issue');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStoreIssue = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteStoreIssue(id);
      toast.success('Store issue deleted successfully');
    } catch (error) {
      toast.error('Failed to delete store issue');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addStoreIssue: handleAddStoreIssue,
    updateStoreIssue: handleUpdateStoreIssue,
    deleteStoreIssue: handleDeleteStoreIssue,
  };
}