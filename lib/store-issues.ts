import { StoreIssue } from '@/types/store-issue';

export const storeIssues: StoreIssue[] = [
  {
    id: 1,
    issueNo: 'SI-2024-001',
    date: '2024-03-15',
    department: 'Production',
    requestedBy: 'John Smith',
    approvedBy: 'David Wilson',
    status: 'Approved',
    priority: 'High',
    items: [
      {
        id: 1,
        itemName: 'Steel Plates',
        description: 'Grade A Steel Plates 10mm',
        quantity: 10,
        unit: 'Pcs',
        stock: 50,
        remarks: 'Urgent requirement',
      }
    ],
    remarks: 'Required for project PRJ-2024-001',
  },
  {
    id: 2,
    issueNo: 'SI-2024-002',
    date: '2024-03-14',
    department: 'Assembly',
    requestedBy: 'Sarah Johnson',
    status: 'Pending',
    priority: 'Medium',
    items: [
      {
        id: 1,
        itemName: 'Bolts and Nuts',
        description: 'M10 Hex Bolts with Nuts',
        quantity: 100,
        unit: 'Sets',
        stock: 500,
      }
    ],
  },
];

export function filterStoreIssues(issues: StoreIssue[], filters: {
  search: string;
  status: string;
  priority: string;
  dateRange: { from: string; to: string };
}): StoreIssue[] {
  return issues.filter((issue) => {
    const matchesSearch = !filters.search || 
      issue.issueNo.toLowerCase().includes(filters.search.toLowerCase()) ||
      issue.department.toLowerCase().includes(filters.search.toLowerCase()) ||
      issue.requestedBy.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || issue.status === filters.status;
    const matchesPriority = filters.priority === 'all' || issue.priority === filters.priority;
    
    const issueDate = new Date(issue.date);
    const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null;
    const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null;
    
    const matchesDateRange = 
      (!fromDate || issueDate >= fromDate) &&
      (!toDate || issueDate <= toDate);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesDateRange;
  });
}

export function addStoreIssue(issue: Partial<StoreIssue>): StoreIssue {
  const newIssue: StoreIssue = {
    id: Math.max(...storeIssues.map(i => i.id)) + 1,
    issueNo: `SI-${new Date().getFullYear()}-${String(storeIssues.length + 1).padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    department: issue.department!,
    requestedBy: issue.requestedBy!,
    approvedBy: issue.approvedBy,
    status: issue.status!,
    priority: issue.priority!,
    items: issue.items!,
    remarks: issue.remarks,
  };
  storeIssues.push(newIssue);
  return newIssue;
}

export function updateStoreIssue(id: number, issueData: Partial<StoreIssue>): StoreIssue {
  const index = storeIssues.findIndex(i => i.id === id);
  if (index === -1) throw new Error('Store issue not found');
  
  storeIssues[index] = { ...storeIssues[index], ...issueData };
  return storeIssues[index];
}

export function deleteStoreIssue(id: number): void {
  const index = storeIssues.findIndex(i => i.id === id);
  if (index === -1) throw new Error('Store issue not found');
  
  storeIssues.splice(index, 1);
}