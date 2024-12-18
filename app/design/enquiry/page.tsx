'use client';

import { useState, useCallback } from 'react';
import { EnquiryHeader } from '@/components/enquiry/enquiry-header';
import { EnquiryTable } from '@/components/enquiry/enquiry-table';
import { EnquiryFilter } from '@/components/enquiry/enquiry-filter';
import { EnquiryFilters } from '@/types/enquiry';
import { useEnquiries } from '@/lib/hooks/use-enquiries';

export default function EnquiryPage() {
  const [filters, setFilters] = useState<EnquiryFilters>({
    search: '',
    status: 'all',
    priority: 'all',
    dateRange: {
      from: '',
      to: '',
    },
    rowsPerPage: 10,
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const { updateEnquiry, deleteEnquiry } = useEnquiries();

  const handleEnquiryUpdate = async (id: number, enquiryData: any) => {
    await updateEnquiry(id, enquiryData);
    setRefreshKey(prev => prev + 1);
  };

  const handleEnquiryDelete = async (id: number) => {
    await deleteEnquiry(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleEnquiryAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <EnquiryHeader onEnquiryAdded={handleEnquiryAdded} />
      <EnquiryFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <EnquiryTable
        key={refreshKey}
        onEnquiryUpdate={handleEnquiryUpdate}
        onEnquiryDelete={handleEnquiryDelete}
      />
    </div>
  );
}