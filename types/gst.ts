export interface GST {
  id: number;
  name: string;
  code: string;
  rate: number;
  type: 'Goods' | 'Services';
  hsn_sac: string;
  description: string;
  status: 'Active' | 'Inactive';
}

export interface GSTFilters {
  search: string;
  status: string;
  type: string;
  rowsPerPage: number;
}