import { cn } from '@/lib/utils';
import { PRIORITY_COLORS } from '@/lib/constants';

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const normalizedPriority = priority.toLowerCase();
  const colorClass = PRIORITY_COLORS[normalizedPriority as keyof typeof PRIORITY_COLORS] || PRIORITY_COLORS.medium;

  return (
    <span className={cn(
      'px-2 py-1 text-xs font-medium rounded-full',
      colorClass,
      className
    )}>
      {priority}
    </span>
  );
}