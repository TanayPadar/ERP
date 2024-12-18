```typescript
'use client';

import { StoreReceivedDialog } from './store-received-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { StoreReceived } from '@/types/store-received';
import { useStoreReceived } from '@/lib/hooks/use-store-received';

interface StoreReceivedHeaderProps {
  onStoreReceiptAdded?: () => void;
}

export function StoreReceivedHeader({ onStoreReceiptAdded }: StoreReceivedHeaderProps) {
  const { addStoreReceipt, isLoading } = useStoreReceived();

  const handleStoreReceiptAdd = async (receiptData: Partial<StoreReceived>) => {
    await addStoreReceipt(receiptData);
    onStoreReceiptAdded?.();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Store Receipts</h1>
        <p className="text-sm text-muted-foreground">Manage goods receipt notes and material inspections</p>
      </div>
      <StoreReceivedDialog
        onSave={handleStoreReceiptAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Receipt
          </Button>
        }
      />
    </div>
  );
}
```