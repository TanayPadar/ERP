'use client';

import { useState, useCallback } from 'react';
import { ClientsHeader } from '@/components/clients/clients-header';
import { ClientsTable } from '@/components/clients/clients-table';
import { ClientsFilter } from '@/components/clients/clients-filter';
import { ClientFilters } from '@/types/client';
import { useClients } from '@/lib/hooks/use-clients';

export default function ClientsPage() {
  const [filters, setFilters] = useState<ClientFilters>({
    search: '',
    status: 'all',
    rowsPerPage: 10,
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const { updateClient, deleteClient } = useClients();

  const handleClientUpdate = async (id: number, clientData: any) => {
    await updateClient(id, clientData);
    setRefreshKey(prev => prev + 1);
  };

  const handleClientDelete = async (id: number) => {
    await deleteClient(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleClientAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <ClientsHeader onClientAdded={handleClientAdded} />
      <ClientsFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <ClientsTable
        key={refreshKey}
        onClientUpdate={handleClientUpdate}
        onClientDelete={handleClientDelete}
      />
    </div>
  );
}