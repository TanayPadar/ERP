'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { DESIGN_MENU_ITEMS } from '@/lib/constants/design';

export function DesignGrid() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {DESIGN_MENU_ITEMS.map((item) => (
        <Link key={item.title} href={item.href}>
          <Card className="p-4 sm:p-6 hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground truncate">
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