'use client';

import { Button } from '@/components/ui/button';
import { MenuIcon, X } from 'lucide-react';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
}

export function SidebarHeader({ 
  isCollapsed, 
  onToggleCollapse,
  isMobile,
  onMobileClose 
}: SidebarHeaderProps) {
  return (
    <div className="flex h-16 items-center justify-between px-4 border-b">
      {!isCollapsed && (
        <h2 className="text-lg font-semibold">FourFgroup ERP</h2>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={isMobile ? onMobileClose : onToggleCollapse}
        className="shrink-0"
      >
        {isMobile ? (
          <X className="h-4 w-4" />
        ) : (
          <MenuIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}