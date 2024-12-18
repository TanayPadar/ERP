'use client';

import { useState, useCallback } from 'react';
import { UsersHeader } from '@/components/users/users-header';
import { UsersTable } from '@/components/users/users-table';
import { UsersFilter } from '@/components/users/users-filter';
import { UserFilters } from '@/types/user';
import { useUsers } from '@/lib/hooks/use-users';

export default function UsersPage() {
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    status: 'all',
    rowsPerPage: 10,
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const { updateUser, deleteUser } = useUsers();

  const handleUserUpdate = async (id: number, userData: any) => {
    await updateUser(id, userData);
    setRefreshKey(prev => prev + 1);
  };

  const handleUserDelete = async (id: number) => {
    await deleteUser(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleUserAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <UsersHeader onUserAdded={handleUserAdded} />
      <UsersFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <UsersTable
        key={refreshKey}
        onUserUpdate={handleUserUpdate}
        onUserDelete={handleUserDelete}
      />
    </div>
  );
}