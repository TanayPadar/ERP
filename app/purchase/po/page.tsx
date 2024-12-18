'use client';

import { useState, useCallback } from 'react';
import { PurchaseOrderHeader } from '@/components/purchase-order/purchase-order-header';
import { PurchaseOrderTable } from '@/components/purchase-order/purchase-order-table';
import { PurchaseOrderFilter } from '@/components/purchase-order/purchase-order-filter';
import { PurchaseOrderFilters } from '@/types/purchase-order';
import { usePurchaseOrders } from '@/lib/hooks/use-purchase-orders';

export default function PurchaseOrderPage() {
  const [filters, setFilters] = useState<PurchaseOrderFilters>({
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
  const { updatePurchaseOrder, deletePurchaseOrder } = usePurchaseOrders();

  const handlePurchaseOrderUpdate = async (id: number, orderData: any) => {
    await updatePurchaseOrder(id, orderData);
    setRefreshKey(prev => prev + 1);
  };

  const handlePurchaseOrderDelete = async (id: number) => {
    await deletePurchaseOrder(id);
    setRefreshKey(prev => prev + 1);
  };

  const handlePurchaseOrderAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <PurchaseOrderHeader onPurchaseOrderAdded={handlePurchaseOrderAdded} />
      <PurchaseOrderFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <PurchaseOrderTable
        key={refreshKey}
        onPurchaseOrderUpdate={handlePurchaseOrderUpdate}
        onPurchaseOrderDelete={handlePurchaseOrderDelete}
      />
    </div>
  );
}