'use client';

import { useState, useCallback } from 'react';
import { StoreIssueHeader } from '@/components/store-issue/store-issue-header';
import { StoreIssueTable } from '@/components/store-issue/store-issue-table';
import { StoreIssueFilter } from '@/components/store-issue/store-issue-filter';
import { StoreIssueFilters } from '@/types/store-issue';
import { useStoreIssues } from '@/lib/hooks/use-store-issues';

export default function StoreIssuePage() {
  const [filters, setFilters] = useState<StoreIssueFilters>({
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
  const { updateStoreIssue, deleteStoreIssue } = useStoreIssues();

  const handleStoreIssueUpdate = async (id: number, issueData: any) => {
    await updateStoreIssue(id, issueData);
    setRefreshKey(prev => prev + 1);
  };

  const handleStoreIssueDelete = async (id: number) => {
    await deleteStoreIssue(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleStoreIssueAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <StoreIssueHeader onStoreIssueAdded={handleStoreIssueAdded} />
      <StoreIssueFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <StoreIssueTable
        key={refreshKey}
        onStoreIssueUpdate={handleStoreIssueUpdate}
        onStoreIssueDelete={handleStoreIssueDelete}
      />
    </div>
  );
}