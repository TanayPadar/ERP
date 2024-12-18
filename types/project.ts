export interface Project {
  id: number;
  projectNo: string;
  date: string;
  clientName: string;
  title: string;
  description: string;
  value: number;
  status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High';
  startDate?: string;
  endDate?: string;
  assignedTo: string;
  progress: number;
  attachments?: string[];
}

export interface ProjectFilters {
  search: string;
  status: string;
  priority: string;
  dateRange: {
    from: string;
    to: string;
  };
  rowsPerPage: number;
}