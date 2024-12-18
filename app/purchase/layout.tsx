'use client';

import { usePathname } from 'next/navigation';

export default function PurchaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const section = pathname.split('/')[2] || 'Overview';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Purchase</h1>
        <p className="text-muted-foreground">
          {section.charAt(0).toUpperCase() + section.slice(1)} management and tracking
        </p>
      </div>
      {children}
    </div>
  );
}