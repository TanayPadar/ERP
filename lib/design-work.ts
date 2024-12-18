import { DesignWork } from '@/types/design-work';

export const designWorks: DesignWork[] = [
  {
    id: 1,
    workNo: 'DW-2024-001',
    date: '2024-03-15',
    projectId: 1,
    title: 'CNC Part Design - Phase 1',
    description: 'Initial design and drafting of custom CNC machine parts',
    designer: 'Michael Chen',
    reviewer: 'David Wilson',
    status: 'In Progress',
    priority: 'High',
    startDate: '2024-03-20',
    dueDate: '2024-03-30',
    progress: 45,
    comments: 'Design specifications under review',
  },
  {
    id: 2,
    workNo: 'DW-2024-002',
    date: '2024-03-14',
    projectId: 2,
    title: 'Equipment Layout Design',
    description: 'Industrial equipment layout and installation planning',
    designer: 'Sarah Johnson',
    reviewer: 'Emily Brown',
    status: 'Under Review',
    priority: 'Medium',
    startDate: '2024-03-15',
    dueDate: '2024-03-25',
    progress: 80,
    comments: 'Awaiting final approval',
  },
];

export function filterDesignWorks(designWorks: DesignWork[], filters: {
  search: string;
  status: string;
  priority: string;
  dateRange: { from: string; to: string };
}): DesignWork[] {
  return designWorks.filter((work) => {
    const matchesSearch = !filters.search || 
      work.workNo.toLowerCase().includes(filters.search.toLowerCase()) ||
      work.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      work.designer.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || work.status === filters.status;
    const matchesPriority = filters.priority === 'all' || work.priority === filters.priority;
    
    const workDate = new Date(work.date);
    const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null;
    const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null;
    
    const matchesDateRange = 
      (!fromDate || workDate >= fromDate) &&
      (!toDate || workDate <= toDate);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesDateRange;
  });
}

export function addDesignWork(work: Partial<DesignWork>): DesignWork {
  const newWork: DesignWork = {
    id: Math.max(...designWorks.map(w => w.id)) + 1,
    workNo: `DW-${new Date().getFullYear()}-${String(designWorks.length + 1).padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    projectId: work.projectId!,
    title: work.title!,
    description: work.description!,
    designer: work.designer!,
    reviewer: work.reviewer!,
    status: work.status!,
    priority: work.priority!,
    startDate: work.startDate,
    dueDate: work.dueDate,
    completionDate: work.completionDate,
    progress: work.progress || 0,
    comments: work.comments,
    attachments: work.attachments,
  };
  designWorks.push(newWork);
  return newWork;
}

export function updateDesignWork(id: number, workData: Partial<DesignWork>): DesignWork {
  const index = designWorks.findIndex(w => w.id === id);
  if (index === -1) throw new Error('Design work not found');
  
  designWorks[index] = { ...designWorks[index], ...workData };
  return designWorks[index];
}

export function deleteDesignWork(id: number): void {
  const index = designWorks.findIndex(w => w.id === id);
  if (index === -1) throw new Error('Design work not found');
  
  designWorks.splice(index, 1);
}