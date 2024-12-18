'use client';

import { useState } from 'react';
import { EnquiryTable } from './enquiry-table';
import { EnquiryHeader } from './enquiry-header';
import { EnquiryFilters } from './enquiry-filters';
import { useEnquiries } from '@/hooks/use-enquiries';

export function EnquiryList() {
  const { enquiries, isLoading, error } = useEnquiries();
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    date: 'all',
  });

  return (
    <div className="space-y-6">
      <EnquiryHeader />
      <EnquiryFilters filters={filters} onFiltersChange={setFilters} />
      <EnquiryTable enquiries={enquiries} isLoading={isLoading} />
    </div>
  );
}