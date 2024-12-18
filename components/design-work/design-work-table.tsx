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
import { DesignWork } from '@/types/design-work';
import { designWorks } from '@/lib/design-work';
import { DesignWorkDialog } from './design-work-dialog';
import { useState } from 'react';
import { useDesignWork } from '@/lib/hooks/use-design-work';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';

interface DesignWorkTableProps {
  onDesignWorkUpdate: (id: number, data: Partial<DesignWork>) => Promise<void>;
  onDesignWorkDelete: (id: number) => Promise<void>;
}

function DesignWorkStatusBadge({ status }: { status: DesignWork['status'] }) {
  const colors = {
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Under Review': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: DesignWork['priority'] }) {
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

export function DesignWorkTable({ onDesignWorkUpdate, onDesignWorkDelete }: DesignWorkTableProps) {
  const [selectedWork, setSelectedWork] = useState<DesignWork | null>(null);
  const { isLoading } = useDesignWork();

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Work No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Designer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {designWorks.map((work) => (
              <TableRow key={work.id}>
                <TableCell className="font-medium">{work.workNo}</TableCell>
                <TableCell>{format(new Date(work.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell className="max-w-[200px] truncate">{work.title}</TableCell>
                <TableCell>{work.designer}</TableCell>
                <TableCell>
                  <DesignWorkStatusBadge status={work.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={work.priority} />
                </TableCell>
                <TableCell>
                  <div className="w-[100px]">
                    <Progress value={work.progress} className="h-2" />
                    <span className="text-xs text-muted-foreground">{work.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  {work.dueDate ? format(new Date(work.dueDate), 'dd/MM/yyyy') : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DesignWorkDialog
                      work={work}
                      onSave={(data) => onDesignWorkUpdate(work.id, data)}
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
                      onClick={() => onDesignWorkDelete(work.id)}
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