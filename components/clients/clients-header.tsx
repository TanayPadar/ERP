'use client';

import { ClientDialog } from './client-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Client } from '@/types/client';
import { useClients } from '@/lib/hooks/use-clients';

interface ClientsHeaderProps {
  onClientAdded?: () => void;
}

export function ClientsHeader({ onClientAdded }: ClientsHeaderProps) {
  const { addClient, isLoading } = useClients();

  const handleClientAdd = async (clientData: Partial<Client>) => {
    await addClient(clientData);
    onClientAdded?.();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Clients List</h1>
        <p className="text-sm text-muted-foreground">Manage and view all clients</p>
      </div>
      <ClientDialog
        onSave={handleClientAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Client
          </Button>
        }
      />
    </div>
  );
}