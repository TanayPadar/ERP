'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UserStatusBadge } from '@/components/users/user-status-badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { Vendor } from '@/types/vendor';
import { vendors } from '@/lib/vendors';
import { VendorDialog } from './vendor-dialog';
import { useState } from 'react';
import { useVendors } from '@/lib/hooks/use-vendors';

interface VendorsTableProps {
  onVendorUpdate: (id: number, data: Partial<Vendor>) => Promise<void>;
  onVendorDelete: (id: number) => Promise<void>;
}

export function VendorsTable({ onVendorUpdate, onVendorDelete }: VendorsTableProps) {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const { isLoading } = useVendors();

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>GST Number</TableHead>
              <TableHead>PAN Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">{vendor.name}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.phone}</TableCell>
                <TableCell>{vendor.category}</TableCell>
                <TableCell>{vendor.gst}</TableCell>
                <TableCell>{vendor.pan}</TableCell>
                <TableCell>
                  <UserStatusBadge status={vendor.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <VendorDialog
                      vendor={vendor}
                      onSave={(data) => onVendorUpdate(vendor.id, data)}
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
                      onClick={() => onVendorDelete(vendor.id)}
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