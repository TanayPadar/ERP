'use client';

import { useState, useCallback } from 'react';
import { MachinesHeader } from './machines-header';
import { MachinesFilter } from './machines-filter';
import { MachinesTable } from './machines-table';
import { useMachines } from '@/lib/hooks/use-machines';
import { MachineFilters } from '@/types/machine';

export function MachinesView() {
  const [filters, setFilters] = useState<MachineFilters>({
    search: '',
    status: 'all',
    type: 'all',
    department: 'all',
    rowsPerPage: 10,
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const { updateMachine, deleteMachine } = useMachines();

  const handleMachineUpdate = async (id: number, machineData: any) => {
    await updateMachine(id, machineData);
    setRefreshKey(prev => prev + 1);
  };

  const handleMachineDelete = async (id: number) => {
    await deleteMachine(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleMachineAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <MachinesHeader onMachineAdded={handleMachineAdded} />
      <MachinesFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <MachinesTable
        key={refreshKey}
        onMachineUpdate={handleMachineUpdate}
        onMachineDelete={handleMachineDelete}
      />
    </div>
  );
}