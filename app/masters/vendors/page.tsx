'use client';

import { useState, useCallback } from 'react';
import { VendorsHeader } from '@/components/vendors/vendors-header';
import { VendorsTable } from '@/components/vendors/vendors-table';
import { VendorsFilter } from '@/components/vendors/vendors-filter';
import { VendorFilters } from '@/types/vendor';
import { useVendors } from '@/lib/hooks/use-vendors';

export default function VendorsPage() {
  const [filters, setFilters] = useState<VendorFilters>({
    search: '',
    status: 'all',
    category: 'all',
    rowsPerPage: 10,
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const { updateVendor, deleteVendor } = useVendors();

  const handleVendorUpdate = async (id: number, vendorData: any) => {
    await updateVendor(id, vendorData);
    setRefreshKey(prev => prev + 1);
  };

  const handleVendorDelete = async (id: number) => {
    await deleteVendor(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleVendorAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <VendorsHeader onVendorAdded={handleVendorAdded} />
      <VendorsFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <VendorsTable
        key={refreshKey}
        onVendorUpdate={handleVendorUpdate}
        onVendorDelete={handleVendorDelete}
      />
    </div>
  );
}