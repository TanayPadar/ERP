'use client';

import { useState, useCallback } from 'react';
import { DesignWorkHeader } from '@/components/design-work/design-work-header';
import { DesignWorkTable } from '@/components/design-work/design-work-table';
import { DesignWorkFilter } from '@/components/design-work/design-work-filter';
import { DesignWorkFilters } from '@/types/design-work';
import { useDesignWork } from '@/lib/hooks/use-design-work';

export default function DesignWorkPage() {
  const [filters, setFilters] = useState<DesignWorkFilters>({
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
  const { updateDesignWork, deleteDesignWork } = useDesignWork();

  const handleDesignWorkUpdate = async (id: number, workData: any) => {
    await updateDesignWork(id, workData);
    setRefreshKey(prev => prev + 1);
  };

  const handleDesignWorkDelete = async (id: number) => {
    await deleteDesignWork(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleDesignWorkAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <DesignWorkHeader onDesignWorkAdded={handleDesignWorkAdded} />
      <DesignWorkFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <DesignWorkTable
        key={refreshKey}
        onDesignWorkUpdate={handleDesignWorkUpdate}
        onDesignWorkDelete={handleDesignWorkDelete}
      />
    </div>
  );
}