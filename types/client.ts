export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  gst: string;
  pan: string;
  status: 'Active' | 'Inactive';
}

export interface ClientFilters {
  search: string;
  status: string;
  rowsPerPage: number;
}