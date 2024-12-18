'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { GSTFilters } from '@/types/gst';

interface GSTFilterProps {
  filters: GSTFilters;
  onFiltersChange: (filters: GSTFilters) => void;
}

export function GSTFilter({ filters, onFiltersChange }: GSTFilterProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value });
  };

  const handleTypeChange = (value: string) => {
    onFiltersChange({ ...filters, type: value });
  };

  const handleRowsPerPageChange = (value: string) => {
    onFiltersChange({ ...filters, rowsPerPage: Number(value) });
  };

  return (
    <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
      <div className="flex gap-2 w-full md:w-auto md:max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search GST rates..."
            className="pl-8"
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Select
          value={filters.type}
          onValueChange={handleTypeChange}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Goods">Goods</SelectItem>
            <SelectItem value="Services">Services</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.status}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={String(filters.rowsPerPage)}
          onValueChange={handleRowsPerPageChange}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 rows</SelectItem>
            <SelectItem value="20">20 rows</SelectItem>
            <SelectItem value="50">50 rows</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}