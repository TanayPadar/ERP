```typescript
'use client';

import { WorkshopDataDialog } from './workshop-data-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { WorkshopData } from '@/types/workshop-data';
import { useWorkshopData } from '@/lib/hooks/use-workshop-data';

interface WorkshopDataHeaderProps {
  onWorkshopDataAdded?: () => void;
}

export function WorkshopDataHeader({ onWorkshopDataAdded }: WorkshopDataHeaderProps) {
  const { addWorkshopData, isLoading } = useWorkshopData();

  const handleWorkshopDataAdd = async (data: Partial<WorkshopData>) => {
    await addWorkshopData(data);
    onWorkshopDataAdded?.();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Workshop Data Conversion</h1>
        <p className="text-sm text-muted-foreground">Manage workshop jobs and data conversion tasks</p>
      </div>
      <WorkshopDataDialog
        onSave={handleWorkshopDataAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Job
          </Button>
        }
      />
    </div>
  );
}
```