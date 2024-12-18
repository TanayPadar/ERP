import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 1,
    projectNo: 'PRJ-2024-001',
    date: '2024-03-15',
    clientName: 'ABC Industries',
    title: 'Custom CNC Machine Parts',
    description: 'Manufacturing of custom CNC machine parts as per specifications',
    value: 150000,
    status: 'In Progress',
    priority: 'High',
    startDate: '2024-03-20',
    endDate: '2024-04-20',
    assignedTo: 'David Wilson',
    progress: 35,
  },
  {
    id: 2,
    projectNo: 'PRJ-2024-002',
    date: '2024-03-14',
    clientName: 'XYZ Manufacturing',
    title: 'Industrial Equipment Setup',
    description: 'Installation and setup of industrial equipment',
    value: 280000,
    status: 'Planning',
    priority: 'Medium',
    startDate: '2024-04-01',
    endDate: '2024-05-15',
    assignedTo: 'Emily Brown',
    progress: 15,
  },
];

export function filterProjects(projects: Project[], filters: {
  search: string;
  status: string;
  priority: string;
  dateRange: { from: string; to: string };
}): Project[] {
  return projects.filter((project) => {
    const matchesSearch = !filters.search || 
      project.projectNo.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.clientName.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.title.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || project.status === filters.status;
    const matchesPriority = filters.priority === 'all' || project.priority === filters.priority;
    
    const projectDate = new Date(project.date);
    const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null;
    const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null;
    
    const matchesDateRange = 
      (!fromDate || projectDate >= fromDate) &&
      (!toDate || projectDate <= toDate);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesDateRange;
  });
}

export function addProject(project: Partial<Project>): Project {
  const newProject: Project = {
    id: Math.max(...projects.map(p => p.id)) + 1,
    projectNo: `PRJ-${new Date().getFullYear()}-${String(projects.length + 1).padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    clientName: project.clientName!,
    title: project.title!,
    description: project.description!,
    value: project.value!,
    status: project.status!,
    priority: project.priority!,
    startDate: project.startDate,
    endDate: project.endDate,
    assignedTo: project.assignedTo!,
    progress: project.progress || 0,
    attachments: project.attachments,
  };
  projects.push(newProject);
  return newProject;
}

export function updateProject(id: number, projectData: Partial<Project>): Project {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Project not found');
  
  projects[index] = { ...projects[index], ...projectData };
  return projects[index];
}

export function deleteProject(id: number): void {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Project not found');
  
  projects.splice(index, 1);
}