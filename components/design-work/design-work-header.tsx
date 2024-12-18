'use client';

import { DesignWorkDialog } from './design-work-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DesignWork } from '@/types/design-work';
import { useDesignWork } from '@/lib/hooks/use-design-work';

interface DesignWorkHeaderProps {
  onDesignWorkAdded?: () => void;
}

export function DesignWorkHeader({ onDesignWorkAdded }: DesignWorkHeaderProps) {
  const { addDesignWork, isLoading } = useDesignWork();

  const handleDesignWorkAdd = async (workData: Partial<DesignWork>) => {
    await addDesignWork(workData);
    onDesignWorkAdded?.();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Design Work List</h1>
        <p className="text-sm text-muted-foreground">Manage design tasks and assignments</p>
      </div>
      <DesignWorkDialog
        onSave={handleDesignWorkAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Design Work
          </Button>
        }
      />
    </div>
  );
}