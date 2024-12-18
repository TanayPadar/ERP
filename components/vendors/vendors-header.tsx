'use client';

import { VendorDialog } from './vendor-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Vendor } from '@/types/vendor';
import { useVendors } from '@/lib/hooks/use-vendors';

interface VendorsHeaderProps {
  onVendorAdded?: () => void;
}

export function VendorsHeader({ onVendorAdded }: VendorsHeaderProps) {
  const { addVendor, isLoading } = useVendors();

  const handleVendorAdd = async (vendorData: Partial<Vendor>) => {
    await addVendor(vendorData);
    onVendorAdded?.();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Vendors List</h1>
        <p className="text-sm text-muted-foreground">Manage and view all vendors</p>
      </div>
      <VendorDialog
        onSave={handleVendorAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Vendor
          </Button>
        }
      />
    </div>
  );
}