```typescript
export interface StoreReceived {
  id: number;
  receiptNo: string;
  date: string;
  poNo: string;
  vendorName: string;
  challanNo: string;
  challanDate: string;
  status: 'Pending' | 'Inspected' | 'Accepted' | 'Rejected';
  items: StoreReceivedItem[];
  remarks?: string;
  inspectedBy?: string;
  inspectionDate?: string;
}

export interface StoreReceivedItem {
  id: number;
  itemName: string;
  description: string;
  orderedQty: number;
  receivedQty: number;
  acceptedQty: number;
  rejectedQty: number;
  unit: string;
  remarks?: string;
}

export interface StoreReceivedFilters {
  search: string;
  status: string;
  dateRange: {
    from: string;
    to: string;
  };
  rowsPerPage: number;
}
```