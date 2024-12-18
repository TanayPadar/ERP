```typescript
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { StoreReceived } from '@/types/store-received';
import { storeReceipts } from '@/lib/store-received';
import { StoreReceivedDialog } from './store-received-dialog';
import { useState } from 'react';
import { useStoreReceived } from '@/lib/hooks/use-store-received';
import { format } from 'date-fns';

interface StoreReceivedTableProps {
  onStoreReceiptUpdate: (id: number, data: Partial<StoreReceived>) => Promise<void>;
  onStoreReceiptDelete: (id: number) => Promise<void>;
}

function StoreReceivedStatusBadge({ status }: { status: StoreReceived['status'] }) {
  const colors = {
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Inspected': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Accepted': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

export function StoreReceivedTable({ onStoreReceiptUpdate, onStoreReceiptDelete }: StoreReceivedTableProps) {
  const [selectedReceipt, setSelectedReceipt] = useState<StoreReceived | null>(null);
  const { isLoading } = useStoreReceived();

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Receipt No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>PO Number</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Challan No</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeReceipts.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell className="font-medium">{receipt.receiptNo}</TableCell>
                <TableCell>{format(new Date(receipt.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{receipt.poNo}</TableCell>
                <TableCell>{receipt.vendorName}</TableCell>
                <TableCell>{receipt.challanNo}</TableCell>
                <TableCell>
                  <StoreReceivedStatusBadge status={receipt.status} />
                </TableCell>
                <TableCell>{receipt.items.length} items</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <StoreReceivedDialog
                      receipt={receipt}
                      onSave={(data) => onStoreReceiptUpdate(receipt.id, data)}
                      isLoading={isLoading}
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onStoreReceiptDelete(receipt.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
```