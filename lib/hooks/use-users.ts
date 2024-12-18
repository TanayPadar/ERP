'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import { addUser, updateUser, deleteUser, filterUsers } from '@/lib/users';
import { toast } from 'sonner';

export function useUsers() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddUser = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      const newUser = addUser(userData);
      toast.success('User created successfully');
      return newUser;
    } catch (error) {
      toast.error('Failed to create user');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (id: number, userData: Partial<User>) => {
    setIsLoading(true);
    try {
      const updatedUser = updateUser(id, userData);
      toast.success('User updated successfully');
      return updatedUser;
    } catch (error) {
      toast.error('Failed to update user');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteUser(id);
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addUser: handleAddUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
  };
}