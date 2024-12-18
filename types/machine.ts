export interface Machine {
  id: number;
  name: string;
  code: string;
  type: 'CNC' | 'Manual' | 'Assembly' | 'Other';
  department: string;
  operator: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  lastMaintenance?: string;
  nextMaintenance?: string;
  specifications?: {
    make?: string;
    model?: string;
    year?: string;
    capacity?: string;
  };
}

export interface MachineFilters {
  search: string;
  status: string;
  type: string;
  department: string;
  rowsPerPage: number;
}