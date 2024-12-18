```typescript
import { StoreReceived } from '@/types/store-received';

export const storeReceipts: StoreReceived[] = [
  {
    id: 1,
    receiptNo: 'GRN-2024-001',
    date: '2024-03-15',
    poNo: 'PO-2024-001',
    vendorName: 'Steel Suppliers Ltd',
    challanNo: 'CH-001',
    challanDate: '2024-03-15',
    status: 'Accepted',
    items: [
      {
        id: 1,
        itemName: 'Steel Plates',
        description: 'Grade A Steel Plates 10mm',
        orderedQty: 50,
        receivedQty: 50,
        acceptedQty: 48,
        rejectedQty: 2,
        unit: 'Pcs',
        remarks: 'Two pieces damaged during transit',
      }
    ],
    remarks: 'Material quality verified',
    inspectedBy: 'John Smith',
    inspectionDate: '2024-03-15',
  }
];

export function filterStoreReceipts(receipts: StoreReceived[], filters: {
  search: string;
  status: string;
  dateRange: { from: string; to: string };
}): StoreReceived[] {
  return receipts.filter((receipt) => {
    const matchesSearch = !filters.search || 
      receipt.receiptNo.toLowerCase().includes(filters.search.toLowerCase()) ||
      receipt.poNo.toLowerCase().includes(filters.search.toLowerCase()) ||
      receipt.vendorName.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || receipt.status === filters.status;
    
    const receiptDate = new Date(receipt.date);
    const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null;
    const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null;
    
    const matchesDateRange = 
      (!fromDate || receiptDate >= fromDate) &&
      (!toDate || receiptDate <= toDate);
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });
}

export function addStoreReceipt(receipt: Partial<StoreReceived>): StoreReceived {
  const newReceipt: StoreReceived = {
    id: Math.max(...storeReceipts.map(r => r.id)) + 1,
    receiptNo: `GRN-${new Date().getFullYear()}-${String(storeReceipts.length + 1).padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    poNo: receipt.poNo!,
    vendorName: receipt.vendorName!,
    challanNo: receipt.challanNo!,
    challanDate: receipt.challanDate!,
    status: receipt.status!,
    items: receipt.items!,
    remarks: receipt.remarks,
    inspectedBy: receipt.inspectedBy,
    inspectionDate: receipt.inspectionDate,
  };
  storeReceipts.push(newReceipt);
  return newReceipt;
}

export function updateStoreReceipt(id: number, receiptData: Partial<StoreReceived>): StoreReceived {
  const index = storeReceipts.findIndex(r => r.id === id);
  if (index === -1) throw new Error('Store receipt not found');
  
  storeReceipts[index] = { ...storeReceipts[index], ...receiptData };
  return storeReceipts[index];
}

export function deleteStoreReceipt(id: number): void {
  const index = storeReceipts.findIndex(r => r.id === id);
  if (index === -1) throw new Error('Store receipt not found');
  
  storeReceipts.splice(index, 1);
}
```