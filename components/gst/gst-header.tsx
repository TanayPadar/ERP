'use client';

import { GSTDialog } from './gst-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { GST } from '@/types/gst';
import { useGST } from '@/lib/hooks/use-gst';

interface GSTHeaderProps {
  onGSTAdded?: () => void;
}

export function GSTHeader({ onGSTAdded }: GSTHeaderProps) {
  const { addGST, isLoading } = useGST();

  const handleGSTAdd = async (gstData: Partial<GST>) => {
    await addGST(gstData);
    onGSTAdded?.();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">GST Rates</h1>
        <p className="text-sm text-muted-foreground">Manage GST rates and configurations</p>
      </div>
      <GSTDialog
        onSave={handleGSTAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New GST Rate
          </Button>
        }
      />
    </div>
  );
}