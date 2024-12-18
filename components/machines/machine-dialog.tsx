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
import { Machine } from '@/types/machine';
import { Loader2 } from 'lucide-react';

interface MachineDialogProps {
  machine?: Machine;
  onSave: (machine: Partial<Machine>) => Promise<void>;
  trigger?: React.ReactNode;
  isLoading?: boolean;
}

export function MachineDialog({ machine, onSave, trigger, isLoading }: MachineDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Machine>>(
    machine ?? {
      name: '',
      code: '',
      type: 'CNC',
      department: 'Production',
      operator: '',
      status: 'Active',
      specifications: {
        make: '',
        model: '',
        year: '',
        capacity: '',
      },
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
        type: 'CNC',
        department: 'Production',
        operator: '',
        status: 'Active',
        specifications: {
          make: '',
          model: '',
          year: '',
          capacity: '',
        },
      });
    } catch (error) {
      // Error is handled by the useMachines hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Add Machine</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{machine ? 'Edit Machine' : 'Add New Machine'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Machine Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Machine Code</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as Machine['type'] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CNC">CNC</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="Assembly">Assembly</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operator">Operator</Label>
            <Input
              id="operator"
              value={formData.operator}
              onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as Machine['status'] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Specifications</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="make" className="text-sm">Make</Label>
                <Input
                  id="make"
                  value={formData.specifications?.make}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, make: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="model" className="text-sm">Model</Label>
                <Input
                  id="model"
                  value={formData.specifications?.model}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, model: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="year" className="text-sm">Year</Label>
                <Input
                  id="year"
                  value={formData.specifications?.year}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, year: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="capacity" className="text-sm">Capacity</Label>
                <Input
                  id="capacity"
                  value={formData.specifications?.capacity}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, capacity: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {machine ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              machine ? 'Update Machine' : 'Create Machine'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}