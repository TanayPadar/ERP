'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { MENU_ITEMS } from '@/lib/constants/navigation';
import { SidebarHeader } from './sidebar-header';

interface SidebarContentProps {
  isCollapsed: boolean;
  openMenus: string[];
  toggleMenu: (title: string) => void;
  onToggleCollapse: () => void;
  onMobileClose?: () => void;
  isMobile?: boolean;
}

export function SidebarContent({
  isCollapsed,
  openMenus,
  toggleMenu,
  onToggleCollapse,
  onMobileClose,
  isMobile = false,
}: SidebarContentProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className={cn(
      'h-screen flex flex-col bg-card transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      <SidebarHeader 
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
        isMobile={isMobile}
        onMobileClose={onMobileClose}
      />
      <nav className="flex-1 overflow-y-auto space-y-1 p-2">
        {MENU_ITEMS.map((item) => (
          <div key={item.title} className="space-y-1">
            <Button
              asChild
              variant={isActive(item.href) ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                isCollapsed && 'justify-center px-2'
              )}
              onClick={() => {
                if (item.submenu) {
                  toggleMenu(item.title);
                }
                if (onMobileClose && isMobile) {
                  onMobileClose();
                }
              }}
            >
              <Link href={item.href}>
                <item.icon className={cn('h-4 w-4', isCollapsed ? 'mr-0' : 'mr-2')} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.title}</span>
                    {item.submenu && (
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform',
                          openMenus.includes(item.title) && 'rotate-180'
                        )}
                      />
                    )}
                  </>
                )}
              </Link>
            </Button>
            {!isCollapsed &&
              item.submenu &&
              openMenus.includes(item.title) && (
                <div className="pl-6 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Button
                      key={subItem}
                      variant="ghost"
                      asChild
                      className="w-full justify-start"
                      onClick={onMobileClose}
                    >
                      <Link href={`${item.href}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}>
                        {subItem}
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
          </div>
        ))}
      </nav>
    </div>
  );
}