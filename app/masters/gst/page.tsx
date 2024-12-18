'use client';

import { useState, useCallback } from 'react';
import { GSTHeader } from '@/components/gst/gst-header';
import { GSTTable } from '@/components/gst/gst-table';
import { GSTFilter } from '@/components/gst/gst-filter';
import { GSTFilters } from '@/types/gst';
import { useGST } from '@/lib/hooks/use-gst';

export default function GSTPage() {
  const [filters, setFilters] = useState<GSTFilters>({
    search: '',
    status: 'all',
    type: 'all',
    rowsPerPage: 10,
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const { updateGST, deleteGST } = useGST();

  const handleGSTUpdate = async (id: number, gstData: any) => {
    await updateGST(id, gstData);
    setRefreshKey(prev => prev + 1);
  };

  const handleGSTDelete = async (id: number) => {
    await deleteGST(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleGSTAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <GSTHeader onGSTAdded={handleGSTAdded} />
      <GSTFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <GSTTable
        key={refreshKey}
        onGSTUpdate={handleGSTUpdate}
        onGSTDelete={handleGSTDelete}
      />
    </div>
  );
}