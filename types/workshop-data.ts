```typescript
export interface WorkshopData {
  id: number;
  jobNo: string;
  date: string;
  projectNo: string;
  projectName: string;
  partName: string;
  material: string;
  quantity: number;
  status: 'Pending' | 'In Progress' | 'Completed' | 'On Hold';
  priority: 'Low' | 'Medium' | 'High';
  assignedTo: string;
  startDate?: string;
  dueDate?: string;
  completionDate?: string;
  remarks?: string;
  attachments?: string[];
}

export interface WorkshopDataFilters {
  search: string;
  status: string;
  priority: string;
  dateRange: {
    from: string;
    to: string;
  };
  rowsPerPage: number;
}
```