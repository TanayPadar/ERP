'use client';

import { useState } from 'react';
import { Machine } from '@/types/machine';
import { addMachine, updateMachine, deleteMachine } from '@/lib/machines';
import { toast } from 'sonner';

export function useMachines() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMachine = async (machineData: Partial<Machine>) => {
    setIsLoading(true);
    try {
      const newMachine = addMachine(machineData);
      toast.success('Machine created successfully');
      return newMachine;
    } catch (error) {
      toast.error('Failed to create machine');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMachine = async (id: number, machineData: Partial<Machine>) => {
    setIsLoading(true);
    try {
      const updatedMachine = updateMachine(id, machineData);
      toast.success('Machine updated successfully');
      return updatedMachine;
    } catch (error) {
      toast.error('Failed to update machine');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMachine = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteMachine(id);
      toast.success('Machine deleted successfully');
    } catch (error) {
      toast.error('Failed to delete machine');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addMachine: handleAddMachine,
    updateMachine: handleUpdateMachine,
    deleteMachine: handleDeleteMachine,
  };
}