import { FileText, FolderOpen, FileCheck, PenTool } from 'lucide-react';

export const DESIGN_SECTIONS = {
  enquiry: {
    title: 'Enquiries',
    description: 'Manage customer enquiries and requirements',
  },
  projects: {
    title: 'Projects',
    description: 'Track and manage ongoing projects',
  },
  quotation: {
    title: 'Quotations',
    description: 'Handle project quotations and pricing',
  },
  'design-work': {
    title: 'Design Work',
    description: 'Manage technical design tasks',
  },
};

export const DESIGN_MENU_ITEMS = [
  {
    title: 'Enquiries',
    description: 'Manage enquiries',
    icon: FileText,
    href: '/design/enquiry',
  },
  {
    title: 'Projects',
    description: 'Track projects',
    icon: FolderOpen,
    href: '/design/projects',
  },
  {
    title: 'Quotations',
    description: 'Handle quotes',
    icon: FileCheck,
    href: '/design/quotation',
  },
  {
    title: 'Design Work',
    description: 'Design tasks',
    icon: PenTool,
    href: '/design/design-work',
  },
];