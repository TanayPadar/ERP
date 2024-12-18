'use client';

import { usePathname } from 'next/navigation';

export default function MastersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const section = pathname.split('/')[2] || 'Overview';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Masters</h1>
        <p className="text-muted-foreground">
          {section.charAt(0).toUpperCase() + section.slice(1)} management and configuration
        </p>
      </div>
      {children}
    </div>
  );
}