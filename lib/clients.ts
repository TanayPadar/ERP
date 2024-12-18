import { Client } from '@/types/client';

export const clients: Client[] = [
  {
    id: 1,
    name: 'ABC Industries',
    email: 'contact@abcindustries.com',
    phone: '+91 98765 43210',
    address: '123 Industrial Area, Mumbai, Maharashtra',
    gst: 'GSTIN9876543210',
    pan: 'ABCDE1234F',
    status: 'Active',
  },
  {
    id: 2,
    name: 'XYZ Manufacturing',
    email: 'info@xyzmanufacturing.com',
    phone: '+91 98765 43211',
    address: '456 Business Park, Delhi, NCR',
    gst: 'GSTIN9876543211',
    pan: 'FGHIJ5678K',
    status: 'Active',
  },
];

export function filterClients(clients: Client[], filters: { search: string; status: string }): Client[] {
  return clients.filter((client) => {
    const matchesSearch = !filters.search || 
      client.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      client.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      client.phone.includes(filters.search);
    
    const matchesStatus = filters.status === 'all' || client.status === filters.status;
    
    return matchesSearch && matchesStatus;
  });
}

export function addClient(client: Partial<Client>): Client {
  const newClient: Client = {
    id: Math.max(...clients.map(c => c.id)) + 1,
    name: client.name!,
    email: client.email!,
    phone: client.phone!,
    address: client.address!,
    gst: client.gst!,
    pan: client.pan!,
    status: client.status!,
  };
  clients.push(newClient);
  return newClient;
}

export function updateClient(id: number, clientData: Partial<Client>): Client {
  const index = clients.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Client not found');
  
  clients[index] = { ...clients[index], ...clientData };
  return clients[index];
}

export function deleteClient(id: number): void {
  const index = clients.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Client not found');
  
  clients.splice(index, 1);
}