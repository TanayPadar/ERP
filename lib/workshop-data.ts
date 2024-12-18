```typescript
import { WorkshopData } from '@/types/workshop-data';

export const workshopData: WorkshopData[] = [
  {
    id: 1,
    jobNo: 'WS-2024-001',
    date: '2024-03-15',
    projectNo: 'PRJ-2024-001',
    projectName: 'Custom CNC Machine Parts',
    partName: 'Gear Assembly',
    material: 'Stainless Steel',
    quantity: 5,
    status: 'In Progress',
    priority: 'High',
    assignedTo: 'John Smith',
    startDate: '2024-03-16',
    dueDate: '2024-03-25',
    remarks: 'Special heat treatment required',
  },
  {
    id: 2,
    jobNo: 'WS-2024-002',
    date: '2024-03-14',
    projectNo: 'PRJ-2024-002',
    projectName: 'Industrial Equipment Setup',
    partName: 'Mounting Bracket',
    material: 'Mild Steel',
    quantity: 10,
    status: 'Pending',
    priority: 'Medium',
    assignedTo: 'Sarah Johnson',
    dueDate: '2024-03-30',
  },
];

export function filterWorkshopData(data: WorkshopData[], filters: {
  search: string;
  status: string;
  priority: string;
  dateRange: { from: string; to: string };
}): WorkshopData[] {
  return data.filter((item) => {
    const matchesSearch = !filters.search || 
      item.jobNo.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.projectNo.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.partName.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || item.status === filters.status;
    const matchesPriority = filters.priority === 'all' || item.priority === filters.priority;
    
    const itemDate = new Date(item.date);
    const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null;
    const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null;
    
    const matchesDateRange = 
      (!fromDate || itemDate >= fromDate) &&
      (!toDate || itemDate <= toDate);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesDateRange;
  });
}

export function addWorkshopData(data: Partial<WorkshopData>): WorkshopData {
  const newData: WorkshopData = {
    id: Math.max(...workshopData.map(d => d.id)) + 1,
    jobNo: `WS-${new Date().getFullYear()}-${String(workshopData.length + 1).padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    projectNo: data.projectNo!,
    projectName: data.projectName!,
    partName: data.partName!,
    material: data.material!,
    quantity: data.quantity!,
    status: data.status!,
    priority: data.priority!,
    assignedTo: data.assignedTo!,
    startDate: data.startDate,
    dueDate: data.dueDate,
    completionDate: data.completionDate,
    remarks: data.remarks,
    attachments: data.attachments,
  };
  workshopData.push(newData);
  return newData;
}

export function updateWorkshopData(id: number, data: Partial<WorkshopData>): WorkshopData {
  const index = workshopData.findIndex(d => d.id === id);
  if (index === -1) throw new Error('Workshop data not found');
  
  workshopData[index] = { ...workshopData[index], ...data };
  return workshopData[index];
}

export function deleteWorkshopData(id: number): void {
  const index = workshopData.findIndex(d => d.id === id);
  if (index === -1) throw new Error('Workshop data not found');
  
  workshopData.splice(index, 1);
}
```