export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  department: string;
  status: 'Active' | 'Inactive';
}

export interface UserFilters {
  search: string;
  status: string;
  rowsPerPage: number;
}