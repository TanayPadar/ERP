import { cn } from '@/lib/utils';
import { STATUS_COLORS } from '@/lib/constants';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  const colorClass = STATUS_COLORS[normalizedStatus as keyof typeof STATUS_COLORS] || STATUS_COLORS.default;

  return (
    <span className={cn(
      'px-2 py-1 text-xs font-medium rounded-full',
      colorClass,
      className
    )}>
      {status}
    </span>
  );
}