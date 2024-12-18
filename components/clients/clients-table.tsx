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
import { Client } from '@/types/client';
import { clients } from '@/lib/clients';
import { ClientDialog } from './client-dialog';
import { useState } from 'react';
import { useClients } from '@/lib/hooks/use-clients';

interface ClientsTableProps {
  onClientUpdate: (id: number, data: Partial<Client>) => Promise<void>;
  onClientDelete: (id: number) => Promise<void>;
}

export function ClientsTable({ onClientUpdate, onClientDelete }: ClientsTableProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const { isLoading } = useClients();

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>GST Number</TableHead>
              <TableHead>PAN Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.gst}</TableCell>
                <TableCell>{client.pan}</TableCell>
                <TableCell>
                  <UserStatusBadge status={client.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <ClientDialog
                      client={client}
                      onSave={(data) => onClientUpdate(client.id, data)}
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
                      onClick={() => onClientDelete(client.id)}
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