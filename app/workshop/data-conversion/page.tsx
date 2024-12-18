```typescript
'use client';

import { useState, useCallback } from 'react';
import { WorkshopDataHeader } from '@/components/workshop-data/workshop-data-header';
import { WorkshopDataTable } from '@/components/workshop-data/workshop-data-table';
import { WorkshopDataFilter } from '@/components/workshop-data/workshop-data-filter';
import { WorkshopDataFilters } from '@/types/workshop-data';
import { useWorkshopData } from '@/lib/hooks/use-workshop-data';

export default function WorkshopDataPage() {
  const [filters, setFilters] = useState<WorkshopDataFilters>({
    search: '',
    status: 'all',
    priority: 'all',
    dateRange: {
      from: '',
      to: '',
    },
    rowsPerPage: 10,
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const { updateWorkshopData, deleteWorkshopData } = useWorkshopData();

  const handleWorkshopDataUpdate = async (id: number, data: any) => {
    await updateWorkshopData(id, data);
    setRefreshKey(prev => prev + 1);
  };

  const handleWorkshopDataDelete = async (id: number) => {
    await deleteWorkshopData(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleWorkshopDataAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <WorkshopDataHeader onWorkshopDataAdded={handleWorkshopDataAdded} />
      <WorkshopDataFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <WorkshopDataTable
        key={refreshKey}
        onWorkshopDataUpdate={handleWorkshopDataUpdate}
        onWorkshopDataDelete={handleWorkshopDataDelete}
      />
    </div>
  );
}
```