'use client';

import { usePathname } from 'next/navigation';
import { DESIGN_SECTIONS } from '@/lib/constants/design';

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const section = pathname.split('/')[2] || 'Overview';
  const sectionInfo = DESIGN_SECTIONS[section.toLowerCase()] || {
    title: 'Design',
    description: 'Project design and management',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{sectionInfo.title}</h1>
        <p className="text-muted-foreground">{sectionInfo.description}</p>
      </div>
      {children}
    </div>
  );
}