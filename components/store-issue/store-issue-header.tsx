'use client';

import { StoreIssueDialog } from './store-issue-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { StoreIssue } from '@/types/store-issue';
import { useStoreIssues } from '@/lib/hooks/use-store-issues';

interface StoreIssueHeaderProps {
  onStoreIssueAdded?: () => void;
}

export function StoreIssueHeader({ onStoreIssueAdded }: StoreIssueHeaderProps) {
  const { addStoreIssue, isLoading } = useStoreIssues();

  const handleStoreIssueAdd = async (issueData: Partial<StoreIssue>) => {
    await addStoreIssue(issueData);
    onStoreIssueAdded?.();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Store Issues</h1>
        <p className="text-sm text-muted-foreground">Manage store material issues and requests</p>
      </div>
      <StoreIssueDialog
        onSave={handleStoreIssueAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Issue
          </Button>
        }
      />
    </div>
  );
}