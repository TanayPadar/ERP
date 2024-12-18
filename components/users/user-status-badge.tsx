'use client';

import { Badge } from '@/components/ui/badge';
import { User } from '@/types/user';

interface UserStatusBadgeProps {
  status: User['status'];
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return (
    <Badge variant={status === 'Active' ? 'default' : 'secondary'}>
      {status}
    </Badge>
  );
}