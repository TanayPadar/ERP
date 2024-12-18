import { Machine } from '@/types/machine';

export const machines: Machine[] = [
  {
    id: 1,
    name: 'CNC Milling Machine',
    code: 'CNC-001',
    type: 'CNC',
    department: 'Production',
    operator: 'John Doe',
    status: 'Active',
    lastMaintenance: '2024-03-01',
    nextMaintenance: '2024-04-01',
    specifications: {
      make: 'Haas',
      model: 'VF-2',
      year: '2022',
      capacity: '40x20x20 inch',
    },
  },
  {
    id: 2,
    name: 'Manual Lathe',
    code: 'ML-002',
    type: 'Manual',
    department: 'Workshop',
    operator: 'Jane Smith',
    status: 'Maintenance',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-03-15',
    specifications: {
      make: 'South Bend',
      model: 'Heavy 10',
      year: '2021',
      capacity: '10x36 inch',
    },
  },
];

export function filterMachines(machines: Machine[], filters: { 
  search: string; 
  status: string; 
  type: string;
  department: string;
}): Machine[] {
  return machines.filter((machine) => {
    const matchesSearch = !filters.search || 
      machine.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      machine.code.toLowerCase().includes(filters.search.toLowerCase()) ||
      machine.operator.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || machine.status === filters.status;
    const matchesType = filters.type === 'all' || machine.type === filters.type;
    const matchesDepartment = filters.department === 'all' || machine.department === filters.department;
    
    return matchesSearch && matchesStatus && matchesType && matchesDepartment;
  });
}

export function addMachine(machine: Partial<Machine>): Machine {
  const newMachine: Machine = {
    id: Math.max(...machines.map(m => m.id)) + 1,
    name: machine.name!,
    code: machine.code!,
    type: machine.type!,
    department: machine.department!,
    operator: machine.operator!,
    status: machine.status!,
    lastMaintenance: machine.lastMaintenance,
    nextMaintenance: machine.nextMaintenance,
    specifications: machine.specifications,
  };
  machines.push(newMachine);
  return newMachine;
}

export function updateMachine(id: number, machineData: Partial<Machine>): Machine {
  const index = machines.findIndex(m => m.id === id);
  if (index === -1) throw new Error('Machine not found');
  
  machines[index] = { ...machines[index], ...machineData };
  return machines[index];
}

export function deleteMachine(id: number): void {
  const index = machines.findIndex(m => m.id === id);
  if (index === -1) throw new Error('Machine not found');
  
  machines.splice(index, 1);
}