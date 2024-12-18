'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
  Users,
  UserCircle,
  Store,
  Cog,
  Calculator,
  Building2,
} from 'lucide-react';

const masterItems = [
  {
    title: 'Users',
    description: 'Manage system users and permissions',
    icon: Users,
    href: '/masters/users',
  },
  {
    title: 'Clients',
    description: 'Manage client information',
    icon: UserCircle,
    href: '/masters/clients',
  },
  {
    title: 'Vendors',
    description: 'Manage vendor details',
    icon: Store,
    href: '/masters/vendors',
  },
  {
    title: 'Machines',
    description: 'Configure machine settings',
    icon: Cog,
    href: '/masters/machines',
  },
  {
    title: 'GST',
    description: 'GST rates and configurations',
    icon: Calculator,
    href: '/masters/gst',
  },
  {
    title: 'Departments',
    description: 'Manage company departments',
    icon: Building2,
    href: '/masters/departments',
  },
];

export function MastersGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {masterItems.map((item) => (
        <Link key={item.title} href={item.href}>
          <Card className="p-6 hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}