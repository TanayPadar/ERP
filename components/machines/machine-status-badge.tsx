'use client';

interface MachineStatusBadgeProps {
  status: 'Active' | 'Inactive' | 'Maintenance';
}

const statusColors = {
  'Active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  'Maintenance': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

export function MachineStatusBadge({ status }: MachineStatusBadgeProps) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
      {status}
    </span>
  );
}