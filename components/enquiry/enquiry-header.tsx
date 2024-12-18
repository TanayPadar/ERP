'use client';

import { EnquiryDialog } from './enquiry-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Enquiry } from '@/types/enquiry';
import { useEnquiries } from '@/lib/hooks/use-enquiries';

interface EnquiryHeaderProps {
  onEnquiryAdded?: () => void;
}

export function EnquiryHeader({ onEnquiryAdded }: EnquiryHeaderProps) {
  const { addEnquiry, isLoading } = useEnquiries();

  const handleEnquiryAdd = async (enquiryData: Partial<Enquiry>) => {
    await addEnquiry(enquiryData);
    onEnquiryAdded?.();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Enquiries List</h1>
        <p className="text-sm text-muted-foreground">Manage customer enquiries and requirements</p>
      </div>
      <EnquiryDialog
        onSave={handleEnquiryAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Enquiry
          </Button>
        }
      />
    </div>
  );
}