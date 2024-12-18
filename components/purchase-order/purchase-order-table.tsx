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
import { PurchaseOrder } from '@/types/purchase-order';
import { purchaseOrders } from '@/lib/purchase-orders';
import { PurchaseOrderDialog } from './purchase-order-dialog';
import { useState } from 'react';
import { usePurchaseOrders } from '@/lib/hooks/use-purchase-orders';
import { format } from 'date-fns';

interface PurchaseOrderTableProps {
  onPurchaseOrderUpdate: (id: number, data: Partial<PurchaseOrder>) => Promise<void>;
  onPurchaseOrderDelete: (id: number) => Promise<void>;
}

function PurchaseOrderStatusBadge({ status }: { status: PurchaseOrder['status'] }) {
  const colors = {
    'Draft': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Approved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Completed': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: PurchaseOrder['priority'] }) {
  const colors = {
    'Low': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'High': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
      {priority}
    </span>
  );
}

export function PurchaseOrderTable({ onPurchaseOrderUpdate, onPurchaseOrderDelete }: PurchaseOrderTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const { isLoading } = usePurchaseOrders();

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.poNo}</TableCell>
                <TableCell>{format(new Date(order.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{order.vendorName}</TableCell>
                <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                <TableCell>
                  <PurchaseOrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={order.priority} />
                </TableCell>
                <TableCell>
                  {order.deliveryDate ? format(new Date(order.deliveryDate), 'dd/MM/yyyy') : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <PurchaseOrderDialog
                      order={order}
                      onSave={(data) => onPurchaseOrderUpdate(order.id, data)}
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
                      onClick={() => onPurchaseOrderDelete(order.id)}
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