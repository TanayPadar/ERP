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
import { GST } from '@/types/gst';
import { Loader2 } from 'lucide-react';

interface GSTDialogProps {
  gst?: GST;
  onSave: (gst: Partial<GST>) => Promise<void>;
  trigger?: React.ReactNode;
  isLoading?: boolean;
}

export function GSTDialog({ gst, onSave, trigger, isLoading }: GSTDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<GST>>(
    gst ?? {
      name: '',
      code: '',
      rate: 0,
      type: 'Goods',
      hsn_sac: '',
      description: '',
      status: 'Active',
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      setOpen(false);
      setFormData({
        name: '',
        code: '',
        rate: 0,
        type: 'Goods',
        hsn_sac: '',
        description: '',
        status: 'Active',
      });
    } catch (error) {
      // Error is handled by the useGST hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Add GST Rate</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{gst ? 'Edit GST Rate' : 'Add New GST Rate'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as GST['type'] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Goods">Goods</SelectItem>
                <SelectItem value="Services">Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hsn_sac">HSN/SAC Code</Label>
            <Input
              id="hsn_sac"
              value={formData.hsn_sac}
              onChange={(e) => setFormData({ ...formData, hsn_sac: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as GST['status'] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {gst ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              gst ? 'Update GST Rate' : 'Create GST Rate'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}