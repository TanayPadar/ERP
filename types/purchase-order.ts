export interface PurchaseOrder {
  id: number;
  poNo: string;
  date: string;
  vendorName: string;
  vendorId: number;
  totalAmount: number;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  deliveryDate?: string;
  terms?: string;
  items: PurchaseOrderItem[];
  remarks?: string;
  approvedBy?: string;
  approvedDate?: string;
}

export interface PurchaseOrderItem {
  id: number;
  itemName: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  tax: number;
  amount: number;
}

export interface PurchaseOrderFilters {
  search: string;
  status: string;
  priority: string;
  dateRange: {
    from: string;
    to: string;
  };
  rowsPerPage: number;
}