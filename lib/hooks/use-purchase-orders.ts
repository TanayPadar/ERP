'use client';

import { useState } from 'react';
import { PurchaseOrder } from '@/types/purchase-order';
import { addPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } from '@/lib/purchase-orders';
import { toast } from 'sonner';

export function usePurchaseOrders() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPurchaseOrder = async (orderData: Partial<PurchaseOrder>) => {
    setIsLoading(true);
    try {
      const newOrder = addPurchaseOrder(orderData);
      toast.success('Purchase order created successfully');
      return newOrder;
    } catch (error) {
      toast.error('Failed to create purchase order');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePurchaseOrder = async (id: number, orderData: Partial<PurchaseOrder>) => {
    setIsLoading(true);
    try {
      const updatedOrder = updatePurchaseOrder(id, orderData);
      toast.success('Purchase order updated successfully');
      return updatedOrder;
    } catch (error) {
      toast.error('Failed to update purchase order');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePurchaseOrder = async (id: number) => {
    setIsLoading(true);
    try {
      await deletePurchaseOrder(id);
      toast.success('Purchase order deleted successfully');
    } catch (error) {
      toast.error('Failed to delete purchase order');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addPurchaseOrder: handleAddPurchaseOrder,
    updatePurchaseOrder: handleUpdatePurchaseOrder,
    deletePurchaseOrder: handleDeletePurchaseOrder,
  };
}