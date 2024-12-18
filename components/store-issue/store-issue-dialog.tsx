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
import { StoreIssue, StoreIssueItem } from '@/types/store-issue';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { departments } from '@/lib/departments';

interface StoreIssueDialogProps {
  issue?: StoreIssue;
  onSave: (issue: Partial<StoreIssue>) => Promise<void>;
  trigger?: React.ReactNode;
  isLoading?: boolean;
}

export function StoreIssueDialog({ issue, onSave, trigger, isLoading }: StoreIssueDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<StoreIssue>>(
    issue ?? {
      department: '',
      requestedBy: '',
      status: 'Pending',
      priority: 'Medium',
      items: [],
      remarks: '',
    }
  );

  const handleAddItem = () => {
    const newItem: Partial<StoreIssueItem> = {
      id: (formData.items?.length || 0) + 1,
      itemName: '',
      description: '',
      quantity: 0,
      unit: '',
      stock: 0,
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

  const handleItemChange = (index: number, field: keyof StoreIssueItem, value: any) => {
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
        department: '',
        requestedBy: '',
        status: 'Pending',
        priority: 'Medium',
        items: [],
        remarks: '',
      });
    } catch (error) {
      // Error is handled by the useStoreIssues hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Add Store Issue</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{issue ? 'Edit Store Issue' : 'Add New Store Issue'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requestedBy">Requested By</Label>
              <Input
                id="requestedBy"
                value={formData.requestedBy}
                onChange={(e) => setFormData({ ...formData, requestedBy: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as StoreIssue['status'] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Issued">Issued</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as StoreIssue['priority'] })}
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
                <div key={index} className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-end border p-4 rounded-lg">
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
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
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
                  {issue ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                issue ? 'Update Store Issue' : 'Create Store Issue'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}