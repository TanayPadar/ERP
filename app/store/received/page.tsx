```typescript
'use client';

import { useState, useCallback } from 'react';
import { StoreReceivedHeader } from '@/components/store-received/store-received-header';
import { StoreReceivedTable } from '@/components/store-received/store-received-table';
import { StoreReceivedFilter } from '@/components/store-received/store-received-filter';
import { StoreReceivedFilters } from '@/types/store-received';
import { useStoreReceived } from '@/lib/hooks/use-store-received';

export default function StoreReceivedPage() {
  const [filters, setFilters] = useState<StoreReceivedFilters>({
    search: '',
    status: 'all',
    dateRange: {
      from: '',
      to: '',
    },
    rowsPerPage: 10,
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const { updateStoreReceipt, deleteStoreReceipt } = useStoreReceived();

  const handleStoreReceiptUpdate = async (id: number, receiptData: any) => {
    await updateStoreReceipt(id, receiptData);
    setRefreshKey(prev => prev + 1);
  };

  const handleStoreReceiptDelete = async (id: number) => {
    await deleteStoreReceipt(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleStoreReceiptAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <StoreReceivedHeader onStoreReceiptAdded={handleStoreReceiptAdded} />
      <StoreReceivedFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <StoreReceivedTable
        key={refreshKey}
        onStoreReceiptUpdate={handleStoreReceiptUpdate}
        onStoreReceiptDelete={handleStoreReceiptDelete}
      />
    </div>
  );
}
```