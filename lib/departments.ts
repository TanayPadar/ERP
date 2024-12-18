import { Department } from '@/types/department';

export const departments: Department[] = [
  {
    id: 1,
    name: 'Production',
    code: 'PROD',
    head: 'John Smith',
    employees: 25,
    location: 'Main Factory',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Quality Control',
    code: 'QC',
    head: 'Sarah Johnson',
    employees: 12,
    location: 'Main Factory',
    status: 'Active',
  },
];

export function filterDepartments(departments: Department[], filters: { search: string; status: string }): Department[] {
  return departments.filter((department) => {
    const matchesSearch = !filters.search || 
      department.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      department.code.toLowerCase().includes(filters.search.toLowerCase()) ||
      department.head.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || department.status === filters.status;
    
    return matchesSearch && matchesStatus;
  });
}

export function addDepartment(department: Partial<Department>): Department {
  const newDepartment: Department = {
    id: Math.max(...departments.map(d => d.id)) + 1,
    name: department.name!,
    code: department.code!,
    head: department.head!,
    employees: department.employees!,
    location: department.location!,
    status: department.status!,
  };
  departments.push(newDepartment);
  return newDepartment;
}

export function updateDepartment(id: number, departmentData: Partial<Department>): Department {
  const index = departments.findIndex(d => d.id === id);
  if (index === -1) throw new Error('Department not found');
  
  departments[index] = { ...departments[index], ...departmentData };
  return departments[index];
}

export function deleteDepartment(id: number): void {
  const index = departments.findIndex(d => d.id === id);
  if (index === -1) throw new Error('Department not found');
  
  departments.splice(index, 1);
}