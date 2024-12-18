export interface Department {
  id: number;
  name: string;
  code: string;
  head: string;
  employees: number;
  location: string;
  status: 'Active' | 'Inactive';
}

export interface DepartmentFilters {
  search: string;
  status: string;
  rowsPerPage: number;
}