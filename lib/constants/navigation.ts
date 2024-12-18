import {
  LayoutDashboard,
  Database,
  PenTool,
  ShoppingCart,
  Warehouse,
  Factory,
  Shield,
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
  submenu?: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Masters',
    href: '/masters',
    icon: Database,
    submenu: ['Users', 'Clients', 'Vendors', 'Machines', 'GST', 'Departments'],
  },
  {
    title: 'Design',
    href: '/design',
    icon: PenTool,
    submenu: ['Enquiry', 'Projects', 'Quotation', 'Design Work'],
  },
  {
    title: 'Purchase',
    href: '/purchase',
    icon: ShoppingCart,
    submenu: ['PO'],
  },
  {
    title: 'Store',
    href: '/store',
    icon: Warehouse,
    submenu: ['GRN', 'Issue', 'Received'],
  },
  {
    title: 'Workshop',
    href: '/workshop',
    icon: Factory,
    submenu: ['Data Conversion', 'Issue', 'Accept'],
  },
];