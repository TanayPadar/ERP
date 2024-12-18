import { Project } from './project';

export interface DesignWork {
  id: number;
  workNo: string;
  date: string;
  projectId: number;
  project?: Project;
  title: string;
  description: string;
  designer: string;
  reviewer: string;
  status: 'Pending' | 'In Progress' | 'Under Review' | 'Completed' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High';
  startDate?: string;
  dueDate?: string;
  completionDate?: string;
  progress: number;
  comments?: string;
  attachments?: string[];
}

export interface DesignWorkFilters {
  search: string;
  status: string;
  priority: string;
  dateRange: {
    from: string;
    to: string;
  };
  rowsPerPage: number;
}