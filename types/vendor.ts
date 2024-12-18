export interface Vendor {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  gst: string;
  pan: string;
  category: 'Raw Material' | 'Consumables' | 'Services' | 'Other';
  status: 'Active' | 'Inactive';
}

export interface VendorFilters {
  search: string;
  status: string;
  category: string;
  rowsPerPage: number;
}