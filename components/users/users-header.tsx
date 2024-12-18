'use client';

import { UserDialog } from './user-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { User } from '@/types/user';
import { useUsers } from '@/lib/hooks/use-users';

interface UsersHeaderProps {
  onUserAdded?: () => void;
}

export function UsersHeader({ onUserAdded }: UsersHeaderProps) {
  const { addUser, isLoading } = useUsers();

  const handleUserAdd = async (userData: Partial<User>) => {
    await addUser(userData);
    onUserAdded?.();
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">Users List</h1>
        <p className="text-sm text-muted-foreground">Manage and view all system users</p>
      </div>
      <UserDialog
        onSave={handleUserAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        }
      />
    </div>
  );
}