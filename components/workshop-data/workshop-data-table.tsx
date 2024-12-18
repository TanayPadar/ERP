```typescript
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { WorkshopData } from '@/types/workshop-data';
import { workshopData } from '@/lib/workshop-data';
import { WorkshopDataDialog } from './workshop-data-dialog';
import { useState } from 'react';
import { useWorkshopData } from '@/lib/hooks/use-workshop-data';
import { format } from 'date-fns';

interface WorkshopDataTableProps {
  onWorkshopDataUpdate: (id: number, data: Partial<WorkshopData>) => Promise<void>;
  onWorkshopDataDelete: (id: number) => Promise<void>;
}

function WorkshopDataStatusBadge({ status }: { status: WorkshopData['status'] }) {
  const colors = {
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'On Hold': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: WorkshopData['priority'] }) {
  const colors = {
    'Low': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'High': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
      {priority}
    </span>
  );
}

export function WorkshopDataTable({ onWorkshopDataUpdate, onWorkshopDataDelete }: WorkshopDataTableProps) {
  const [selectedData, setSelectedData] = useState<WorkshopData | null>(null);
  const { isLoading } = useWorkshopData();

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Part Name</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workshopData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.jobNo}</TableCell>
                <TableCell>{format(new Date(item.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{item.projectNo}</TableCell>
                <TableCell>{item.partName}</TableCell>
                <TableCell>{item.material}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <WorkshopDataStatusBadge status={item.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={item.priority} />
                </TableCell>
                <TableCell>{item.assignedTo}</TableCell>
                <Table Cell>{item.dueDate ? format(new Date(item.dueDate), 'dd/MM/yyyy') : '-'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <WorkshopDataDialog
                      data={item}
                      onSave={(data) => onWorkshopDataUpdate(item.id, data)}
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
                      onClick={() => onWorkshopDataDelete(item.id)}
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
```