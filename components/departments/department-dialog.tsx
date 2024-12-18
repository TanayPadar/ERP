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
import { Department } from '@/types/department';
import { Loader2 } from 'lucide-react';

interface DepartmentDialogProps {
  department?: Department;
  onSave: (department: Partial<Department>) => Promise<void>;
  trigger?: React.ReactNode;
  isLoading?: boolean;
}

export function DepartmentDialog({ department, onSave, trigger, isLoading }: DepartmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Department>>(
    department ?? {
      name: '',
      code: '',
      head: '',
      employees: 0,
      location: '',
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
        head: '',
        employees: 0,
        location: '',
        status: 'Active',
      });
    } catch (error) {
      // Error is handled by the useDepartments hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Add Department</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{department ? 'Edit Department' : 'Add New Department'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Department Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Department Code</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="head">Department Head</Label>
            <Input
              id="head"
              value={formData.head}
              onChange={(e) => setFormData({ ...formData, head: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employees">Number of Employees</Label>
            <Input
              id="employees"
              type="number"
              min="0"
              value={formData.employees}
              onChange={(e) => setFormData({ ...formData, employees: parseInt(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as Department['status'] })}
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
                {department ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              department ? 'Update Department' : 'Create Department'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}