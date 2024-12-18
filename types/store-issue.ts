export interface StoreIssue {
  id: number;
  issueNo: string;
  date: string;
  department: string;
  requestedBy: string;
  approvedBy?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Issued';
  priority: 'Low' | 'Medium' | 'High';
  items: StoreIssueItem[];
  remarks?: string;
}

export interface StoreIssueItem {
  id: number;
  itemName: string;
  description: string;
  quantity: number;
  unit: string;
  stock: number;
  remarks?: string;
}

export interface StoreIssueFilters {
  search: string;
  status: string;
  priority: string;
  dateRange: {
    from: string;
    to: string;
  };
  rowsPerPage: number;
}