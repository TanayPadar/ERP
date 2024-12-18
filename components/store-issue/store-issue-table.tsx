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
import { StoreIssue } from '@/types/store-issue';
import { storeIssues } from '@/lib/store-issues';
import { StoreIssueDialog } from './store-issue-dialog';
import { useState } from 'react';
import { useStoreIssues } from '@/lib/hooks/use-store-issues';
import { format } from 'date-fns';

interface StoreIssueTableProps {
  onStoreIssueUpdate: (id: number, data: Partial<StoreIssue>) => Promise<void>;
  onStoreIssueDelete: (id: number) => Promise<void>;
}

function StoreIssueStatusBadge({ status }: { status: StoreIssue['status'] }) {
  const colors = {
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Approved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Issued': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: StoreIssue['priority'] }) {
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

export function StoreIssueTable({ onStoreIssueUpdate, onStoreIssueDelete }: StoreIssueTableProps) {
  const [selectedIssue, setSelectedIssue] = useState<StoreIssue | null>(null);
  const { isLoading } = useStoreIssues();

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="font-medium">{issue.issueNo}</TableCell>
                <TableCell>{format(new Date(issue.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{issue.department}</TableCell>
                <TableCell>{issue.requestedBy}</TableCell>
                <TableCell>
                  <StoreIssueStatusBadge status={issue.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={issue.priority} />
                </TableCell>
                <TableCell>{issue.items.length} items</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-en d gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <StoreIssueDialog
                      issue={issue}
                      onSave={(data) => onStoreIssueUpdate(issue.id, data)}
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
                      onClick={() => onStoreIssueDelete(issue.id)}
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