'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PurchaseOrder, PurchaseOrderItem } from '@/types/purchase-order';
import { Loader2, Calendar, Plus, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { vendors } from '@/lib/vendors';

interface PurchaseOrderDialogProps {
  order?: PurchaseOrder;
  onSave: (order: Partial<PurchaseOrder>) => Promise<void>;
  trigger?: React.ReactNode;
  isLoading?: boolean;
}

export function PurchaseOrderDialog({ order, onSave, trigger, isLoading }: PurchaseOrderDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<PurchaseOrder>>(
    order ?? {
      vendorId: 0,
      vendorName: '',
      totalAmount: 0,
      status: 'Draft',
      priority: 'Medium',
      deliveryDate: '',
      terms: '',
      items: [],
      remarks: '',
    }
  );

  const calculateItemAmount = (item: Partial<PurchaseOrderItem>) => {
    const subtotal = (item.quantity || 0) * (item.unitPrice || 0);
    const taxAmount = subtotal * (item.tax || 0) / 100;
    return subtotal + taxAmount;
  };

  const calculateTotalAmount = (items: Partial<PurchaseOrderItem>[]) => {
    return items.reduce((total, item) => total + calculateItemAmount(item), 0);
  };

  const handleVendorChange = (vendorId: string) => {
    const vendor = vendors.find(v => v.id === parseInt(vendorId));
    if (vendor) {
      setFormData({
        ...formData,
        vendorId: vendor.id,
        vendorName: vendor.name,
      });
    }
  };

  const handleAddItem = () => {
    const newItem: Partial<PurchaseOrderItem> = {
      id: (formData.items?.length || 0) + 1,
      itemName: '',
      description: '',
      quantity: 0,
      unit: '',
      unitPrice: 0,
      tax: 0,
      amount: 0,
    };
    setFormData({
      ...formData,
      items: [...(formData.items || []), newItem],
    });
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = formData.items?.filter((_, i) => i !== index) || [];
    setFormData({
      ...formData,
      items: updatedItems,
      totalAmount: calculateTotalAmount(updatedItems),
    });
  };

  const handleItemChange = (index: number, field: keyof PurchaseOrderItem, value: any) => {
    const updatedItems = formData.items?.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };
        return {
          ...updatedItem,
          amount: calculateItemAmount(updatedItem),
        };
      }
      return item;
    }) || [];

    setFormData({
      ...formData,
      items: updatedItems,
      totalAmount: calculateTotalAmount(updatedItems),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      setOpen(false);
      setFormData({
        vendorId: 0,
        vendorName: '',
        totalAmount: 0,
        status: 'Draft',
        priority: 'Medium',
        deliveryDate: '',
        terms: '',
        items: [],
        remarks: '',
      });
    } catch (error) {
      // Error is handled by the usePurchaseOrders hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Add Purchase Order</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{order ? 'Edit Purchase Order' : 'Add New Purchase Order'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vendorId">Vendor</Label>
              <Select
                value={formData.vendorId?.toString()}
                onValueChange={handleVendorChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id.toString()}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Delivery Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {formData.deliveryDate ? format(new Date(formData.deliveryDate), 'PP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={formData.deliveryDate ? new Date(formData.deliveryDate) : undefined}
                    onSelect={(date) => setFormData({
                      ...formData,
                      deliveryDate: date ? format(date, 'yyyy-MM-dd') : undefined
                    })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as PurchaseOrder['status'] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as PurchaseOrder['priority'] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="terms">Payment Terms</Label>
              <Input
                id="terms"
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                placeholder="e.g., Net 30"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Items</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
            <div className="space-y-4">
              {formData.items?.map((item, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-7 gap-4 items-end border p-4 rounded-lg">
                  <div className="sm:col-span-2">
                    <Label>Item Name</Label>
                    <Input
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <Label>Unit Price</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                      required
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label>Tax %</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={item.tax}
                        onChange={(e) => handleItemChange(index, 'tax', parseFloat(e.target.value))}
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              placeholder="Any additional notes or remarks"
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-lg font-semibold">
              Total Amount: ₹{formData.totalAmount?.toLocaleString() || '0'}
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {order ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                order ? 'Update Purchase Order' : 'Create Purchase Order'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}