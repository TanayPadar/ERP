import { Vendor } from '@/types/vendor';

export const vendors: Vendor[] = [
  {
    id: 1,
    name: 'Steel Suppliers Ltd',
    email: 'contact@steelsuppliers.com',
    phone: '+91 98765 43210',
    address: '123 Industrial Area, Mumbai, Maharashtra',
    gst: 'GSTIN9876543210',
    pan: 'ABCDE1234F',
    category: 'Raw Material',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Tools & Equipment Co',
    email: 'info@toolsequip.com',
    phone: '+91 98765 43211',
    address: '456 Business Park, Delhi, NCR',
    gst: 'GSTIN9876543211',
    pan: 'FGHIJ5678K',
    category: 'Consumables',
    status: 'Active',
  },
];

export function filterVendors(vendors: Vendor[], filters: { search: string; status: string; category: string }): Vendor[] {
  return vendors.filter((vendor) => {
    const matchesSearch = !filters.search || 
      vendor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      vendor.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      vendor.phone.includes(filters.search);
    
    const matchesStatus = filters.status === 'all' || vendor.status === filters.status;
    const matchesCategory = filters.category === 'all' || vendor.category === filters.category;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
}

export function addVendor(vendor: Partial<Vendor>): Vendor {
  const newVendor: Vendor = {
    id: Math.max(...vendors.map(v => v.id)) + 1,
    name: vendor.name!,
    email: vendor.email!,
    phone: vendor.phone!,
    address: vendor.address!,
    gst: vendor.gst!,
    pan: vendor.pan!,
    category: vendor.category!,
    status: vendor.status!,
  };
  vendors.push(newVendor);
  return newVendor;
}

export function updateVendor(id: number, vendorData: Partial<Vendor>): Vendor {
  const index = vendors.findIndex(v => v.id === id);
  if (index === -1) throw new Error('Vendor not found');
  
  vendors[index] = { ...vendors[index], ...vendorData };
  return vendors[index];
}

export function deleteVendor(id: number): void {
  const index = vendors.findIndex(v => v.id === id);
  if (index === -1) throw new Error('Vendor not found');
  
  vendors.splice(index, 1);
}