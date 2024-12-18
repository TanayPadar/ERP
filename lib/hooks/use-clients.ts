'use client';

import { useState } from 'react';
import { Client } from '@/types/client';
import { addClient, updateClient, deleteClient } from '@/lib/clients';
import { toast } from 'sonner';

export function useClients() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddClient = async (clientData: Partial<Client>) => {
    setIsLoading(true);
    try {
      const newClient = addClient(clientData);
      toast.success('Client created successfully');
      return newClient;
    } catch (error) {
      toast.error('Failed to create client');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateClient = async (id: number, clientData: Partial<Client>) => {
    setIsLoading(true);
    try {
      const updatedClient = updateClient(id, clientData);
      toast.success('Client updated successfully');
      return updatedClient;
    } catch (error) {
      toast.error('Failed to update client');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteClient(id);
      toast.success('Client deleted successfully');
    } catch (error) {
      toast.error('Failed to delete client');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addClient: handleAddClient,
    updateClient: handleUpdateClient,
    deleteClient: handleDeleteClient,
  };
}