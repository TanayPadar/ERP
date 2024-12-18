import { Enquiry } from '@/types/enquiry';

export const enquiries: Enquiry[] = [
  {
    id: 1,
    enquiryNo: 'ENQ-2024-001',
    date: '2024-03-15',
    clientName: 'ABC Industries',
    contactPerson: 'John Smith',
    phone: '+91 98765 43210',
    email: 'john@abcindustries.com',
    subject: 'CNC Machine Parts',
    description: 'Requirement for custom CNC machine parts',
    status: 'New',
    priority: 'High',
    assignedTo: 'David Wilson',
    followUpDate: '2024-03-20',
  },
  {
    id: 2,
    enquiryNo: 'ENQ-2024-002',
    date: '2024-03-14',
    clientName: 'XYZ Manufacturing',
    contactPerson: 'Sarah Johnson',
    phone: '+91 98765 43211',
    email: 'sarah@xyzmanufacturing.com',
    subject: 'Industrial Equipment',
    description: 'Quote request for industrial equipment',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Emily Brown',
    followUpDate: '2024-03-21',
  },
];

export function filterEnquiries(enquiries: Enquiry[], filters: {
  search: string;
  status: string;
  priority: string;
  dateRange: { from: string; to: string };
}): Enquiry[] {
  return enquiries.filter((enquiry) => {
    const matchesSearch = !filters.search || 
      enquiry.enquiryNo.toLowerCase().includes(filters.search.toLowerCase()) ||
      enquiry.clientName.toLowerCase().includes(filters.search.toLowerCase()) ||
      enquiry.subject.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || enquiry.status === filters.status;
    const matchesPriority = filters.priority === 'all' || enquiry.priority === filters.priority;
    
    const enquiryDate = new Date(enquiry.date);
    const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null;
    const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null;
    
    const matchesDateRange = 
      (!fromDate || enquiryDate >= fromDate) &&
      (!toDate || enquiryDate <= toDate);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesDateRange;
  });
}

export function addEnquiry(enquiry: Partial<Enquiry>): Enquiry {
  const newEnquiry: Enquiry = {
    id: Math.max(...enquiries.map(e => e.id)) + 1,
    enquiryNo: `ENQ-${new Date().getFullYear()}-${String(enquiries.length + 1).padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    clientName: enquiry.clientName!,
    contactPerson: enquiry.contactPerson!,
    phone: enquiry.phone!,
    email: enquiry.email!,
    subject: enquiry.subject!,
    description: enquiry.description!,
    status: enquiry.status!,
    priority: enquiry.priority!,
    assignedTo: enquiry.assignedTo!,
    followUpDate: enquiry.followUpDate,
    attachments: enquiry.attachments,
  };
  enquiries.push(newEnquiry);
  return newEnquiry;
}

export function updateEnquiry(id: number, enquiryData: Partial<Enquiry>): Enquiry {
  const index = enquiries.findIndex(e => e.id === id);
  if (index === -1) throw new Error('Enquiry not found');
  
  enquiries[index] = { ...enquiries[index], ...enquiryData };
  return enquiries[index];
}

export function deleteEnquiry(id: number): void {
  const index = enquiries.findIndex(e => e.id === id);
  if (index === -1) throw new Error('Enquiry not found');
  
  enquiries.splice(index, 1);
}