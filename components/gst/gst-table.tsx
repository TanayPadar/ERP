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
import { GST } from '@/types/gst';
import { gstRates } from '@/lib/gst';
import { GSTDialog } from './gst-dialog';
import { useState } from 'react';
import { useGST } from '@/lib/hooks/use-gst';

interface GSTTableProps {
  onGSTUpdate: (id: number, data: Partial<GST>) => Promise<void>;
  onGSTDelete: (id: number) => Promise<void>;
}

export function GSTTable({ onGSTUpdate, onGSTDelete }: GSTTableProps) {
  const [selectedGST, setSelectedGST] = useState<GST | null>(null);
  const { isLoading } = useGST();

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Rate (%)</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>HSN/SAC</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gstRates.map((gst) => (
              <TableRow key={gst.id}>
                <TableCell className="font-medium">{gst.name}</TableCell>
                <TableCell>{gst.code}</TableCell>
                <TableCell>{gst.rate}%</TableCell>
                <TableCell>{gst.type}</TableCell>
                <TableCell>{gst.hsn_sac}</TableCell>
                <TableCell className="max-w-[200px] truncate">{gst.description}</TableCell>
                <TableCell>
                  <UserStatusBadge status={gst.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <GSTDialog
                      gst={gst}
                      onSave={(data) => onGSTUpdate(gst.id, data)}
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
                      onClick={() => onGSTDelete(gst.id)}
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