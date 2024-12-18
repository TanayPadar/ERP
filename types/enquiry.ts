export interface Enquiry {
  id: number;
  enquiryNo: string;
  date: string;
  clientName: string;
  contactPerson: string;
  phone: string;
  email: string;
  subject: string;
  description: string;
  status: 'New' | 'In Progress' | 'Quoted' | 'Converted' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High';
  assignedTo: string;
  followUpDate?: string;
  attachments?: string[];
}

export interface EnquiryFilters {
  search: string;
  status: string;
  priority: string;
  dateRange: {
    from: string;
    to: string;
  };
  rowsPerPage: number;
}