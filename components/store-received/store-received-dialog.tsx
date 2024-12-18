```typescript
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
import { StoreReceived, StoreReceivedItem } from '@/types/store-received';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { purchaseOrders } from '@/lib/purchase-orders';

interface StoreReceivedDialogProps {
  receipt?: StoreReceived;
  onSave: (receipt: Partial<StoreReceived>) => Promise<void>;
  trigger?: React.ReactNode;
  isLoading?: boolean;
}

export function StoreReceivedDialog({ receipt, onSave, trigger, isLoading }: StoreReceivedDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<StoreReceived>>(
    receipt ?? {
      poNo: '',
      vendorName: '',
      challanNo: '',
      challanDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      items: [],
      remarks: '',
    }
  );

  const handlePOChange = (poNo: string) => {
    const po = purchaseOrders.find(p => p.poNo === poNo);
    if (po) {
      setFormData({
        ...formData,
        poNo: po.poNo,
        vendorName: po.vendorName,
      });
    }
  };

  const handleAddItem = () => {
    const newItem: Partial<StoreReceivedItem> = {
      id: (formData.items?.length || 0) + 1,
      itemName: '',
      description: '',
      orderedQty: 0,
      receivedQty: 0,
      acceptedQty: 0,
      rejectedQty: 0,
      unit: '',
      remarks: '',
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
    });
  };

  const handleItemChange = (index: number, field: keyof StoreReceivedItem, value: any) => {
    const updatedItems = formData.items?.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    }) || [];

    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      setOpen(false);
      setFormData({
        poNo: '',
        vendorName: '',
        challanNo: '',
        challanDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        items: [],
        remarks: '',
      });
    } catch (error) {
      // Error is handled by the useStoreReceived hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Add Store Receipt</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{receipt ? 'Edit Store Receipt' : 'Add New Store Receipt'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="poNo">PO Number</Label>
              <Select
                value={formData.poNo}
                onValueChange={handlePOChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select PO" />
                </SelectTrigger>
                <SelectContent>
                  {purchaseOrders.map((po) => (
                    <SelectItem key={po.id} value={po.poNo}>
                      {po.poNo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendorName">Vendor Name</Label>
              <Input
                id="vendorName"
                value={formData.vendorName}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="challanNo">Challan No</Label>
              <Input
                id="challanNo"
                value={formData.challanNo}
                onChange={(e) => setFormData({ ...formData, challanNo: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="challanDate">Challan Date</Label>
              <Input
                id="challanDate"
                type="date"
                value={formData.challanDate}
                onChange={(e) => setFormData({ ...formData, challanDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as StoreReceived['status'] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Inspected">Inspected</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
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
                    <Label>Ordered Qty</Label>
                    <Input
                      type="number"
                      min="0"
                      value={item.orderedQty}
                      onChange={(e) => handleItemChange(index, 'orderedQty', parseInt(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <Label>Received Qty</Label>
                    <Input
                      type="number"
                      min="0"
                      value={item.receivedQty}
                      onChange={(e) => handleItemChange(index, 'receivedQty', parseInt(e.target.value))}
                      required
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label>Unit</Label>
                      <Input
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
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

          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {receipt ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                receipt ? 'Update Receipt' : 'Create Receipt'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```