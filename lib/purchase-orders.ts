import { PurchaseOrder } from '@/types/purchase-order';

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: 1,
    poNo: 'PO-2024-001',
    date: '2024-03-15',
    vendorName: 'Steel Suppliers Ltd',
    vendorId: 1,
    totalAmount: 125000,
    status: 'Approved',
    priority: 'High',
    deliveryDate: '2024-03-25',
    terms: 'Net 30',
    items: [
      {
        id: 1,
        itemName: 'Steel Plates',
        description: 'Grade A Steel Plates 10mm',
        quantity: 50,
        unit: 'Pcs',
        unitPrice: 2500,
        tax: 18,
        amount: 125000,
      }
    ],
    remarks: 'Urgent requirement for project PRJ-2024-001',
    approvedBy: 'John Smith',
    approvedDate: '2024-03-16',
  },
  {
    id: 2,
    poNo: 'PO-2024-002',
    date: '2024-03-14',
    vendorName: 'Tools & Equipment Co',
    vendorId: 2,
    totalAmount: 75000,
    status: 'Pending',
    priority: 'Medium',
    deliveryDate: '2024-03-30',
    terms: 'Net 45',
    items: [
      {
        id: 1,
        itemName: 'Cutting Tools',
        description: 'CNC Cutting Tools Set',
        quantity: 10,
        unit: 'Sets',
        unitPrice: 7500,
        tax: 18,
        amount: 75000,
      }
    ],
    remarks: 'Standard tooling requirement',
  },
];

export function filterPurchaseOrders(orders: PurchaseOrder[], filters: {
  search: string;
  status: string;
  priority: string;
  dateRange: { from: string; to: string };
}): PurchaseOrder[] {
  return orders.filter((order) => {
    const matchesSearch = !filters.search || 
      order.poNo.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.vendorName.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || order.status === filters.status;
    const matchesPriority = filters.priority === 'all' || order.priority === filters.priority;
    
    const orderDate = new Date(order.date);
    const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null;
    const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null;
    
    const matchesDateRange = 
      (!fromDate || orderDate >= fromDate) &&
      (!toDate || orderDate <= toDate);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesDateRange;
  });
}

export function addPurchaseOrder(order: Partial<PurchaseOrder>): PurchaseOrder {
  const newOrder: PurchaseOrder = {
    id: Math.max(...purchaseOrders.map(o => o.id)) + 1,
    poNo: `PO-${new Date().getFullYear()}-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    vendorName: order.vendorName!,
    vendorId: order.vendorId!,
    totalAmount: order.totalAmount!,
    status: order.status!,
    priority: order.priority!,
    deliveryDate: order.deliveryDate,
    terms: order.terms,
    items: order.items!,
    remarks: order.remarks,
    approvedBy: order.approvedBy,
    approvedDate: order.approvedDate,
  };
  purchaseOrders.push(newOrder);
  return newOrder;
}

export function updatePurchaseOrder(id: number, orderData: Partial<PurchaseOrder>): PurchaseOrder {
  const index = purchaseOrders.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Purchase order not found');
  
  purchaseOrders[index] = { ...purchaseOrders[index], ...orderData };
  return purchaseOrders[index];
}

export function deletePurchaseOrder(id: number): void {
  const index = purchaseOrders.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Purchase order not found');
  
  purchaseOrders.splice(index, 1);
}