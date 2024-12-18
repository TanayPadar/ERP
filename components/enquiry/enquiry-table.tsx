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
import { Enquiry } from '@/types/enquiry';
import { enquiries } from '@/lib/enquiries';
import { EnquiryDialog } from './enquiry-dialog';
import { useState } from 'react';
import { useEnquiries } from '@/lib/hooks/use-enquiries';
import { format } from 'date-fns';

interface EnquiryTableProps {
  onEnquiryUpdate: (id: number, data: Partial<Enquiry>) => Promise<void>;
  onEnquiryDelete: (id: number) => Promise<void>;
}

function EnquiryStatusBadge({ status }: { status: Enquiry['status'] }) {
  const colors = {
    'New': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Quoted': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Converted': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Enquiry['priority'] }) {
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

export function EnquiryTable({ onEnquiryUpdate, onEnquiryDelete }: EnquiryTableProps) {
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const { isLoading } = useEnquiries();

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Enquiry No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Follow Up</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enquiry) => (
              <TableRow key={enquiry.id}>
                <TableCell className="font-medium">{enquiry.enquiryNo}</TableCell>
                <TableCell>{format(new Date(enquiry.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{enquiry.clientName}</TableCell>
                <TableCell className="max-w-[200px] truncate">{enquiry.subject}</TableCell>
                <TableCell>
                  <EnquiryStatusBadge status={enquiry.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={enquiry.priority} />
                </TableCell>
                <TableCell>{enquiry.assignedTo}</TableCell>
                <TableCell>
                  {enquiry.followUpDate ? format(new Date(enquiry.followUpDate), 'dd/MM/yyyy') : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <EnquiryDialog
                      enquiry={enquiry}
                      onSave={(data) => onEnquiryUpdate(enquiry.id, data)}
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
                      onClick={() => onEnquiryDelete(enquiry.id)}
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