'use client';

import { PurchaseOrderDialog } from './purchase-order-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PurchaseOrder } from '@/types/purchase-order';
import { usePurchaseOrders } from '@/lib/hooks/use-purchase-orders';

interface PurchaseOrderHeaderProps {
  onPurchaseOrderAdded?: () => void;
}

export function PurchaseOrderHeader({ onPurchaseOrderAdded }: PurchaseOrderHeaderProps) {
  const { addPurchaseOrder, isLoading } = usePurchaseOrders();

  const handlePurchaseOrderAdd = async (orderData: Partial<PurchaseOrder>) => {
    await addPurchaseOrder(orderData);
    onPurchaseOrderAdded?.();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Purchase Orders</h1>
        <p className="text-sm text-muted-foreground">Manage purchase orders and vendor transactions</p>
      </div>
      <PurchaseOrderDialog
        onSave={handlePurchaseOrderAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New PO
          </Button>
        }
      />
    </div>
  );
}