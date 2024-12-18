'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Client } from '@/types/client';
import { Loader2 } from 'lucide-react';

interface ClientDialogProps {
  client?: Client;
  onSave: (client: Partial<Client>) => Promise<void>;
  trigger?: React.ReactNode;
  isLoading?: boolean;
}

export function ClientDialog({ client, onSave, trigger, isLoading }: ClientDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Client>>(
    client ?? {
      name: '',
      email: '',
      phone: '',
      address: '',
      gst: '',
      pan: '',
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
        email: '',
        phone: '',
        address: '',
        gst: '',
        pan: '',
        status: 'Active',
      });
    } catch (error) {
      // Error is handled by the useClients hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Add Client</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{client ? 'Edit Client' : 'Add New Client'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gst">GST Number</Label>
            <Input
              id="gst"
              value={formData.gst}
              onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pan">PAN Number</Label>
            <Input
              id="pan"
              value={formData.pan}
              onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as Client['status'] })}
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
                {client ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              client ? 'Update Client' : 'Create Client'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}