'use client';

import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

const purchaseItems = [
  {
    title: 'Purchase Orders',
    description: 'Manage purchase orders',
    href: '/purchase/po',
    icon: ShoppingCart,
  }
];

export function PurchaseOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {purchaseItems.map((item) => (
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