```typescript
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
import { Search, Filter, Calendar } from 'lucide-react';
import { StoreReceivedFilters } from '@/types/store-received';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface StoreReceivedFilterProps {
  filters: StoreReceivedFilters;
  onFiltersChange: (filters: StoreReceivedFilters) => void;
}

export function StoreReceivedFilter({ filters, onFiltersChange }: StoreReceivedFilterProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value });
  };

  const handleDateChange = (field: 'from' | 'to', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: { ...filters.dateRange, [field]: value },
    });
  };

  const handleRowsPerPageChange = (value: string) => {
    onFiltersChange({ ...filters, rowsPerPage: Number(value) });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 w-full sm:w-auto sm:flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search receipts..."
              className="pl-8"
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[130px] justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {filters.dateRange.from ? format(new Date(filters.dateRange.from), 'PP') : 'From Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={filters.dateRange.from ? new Date(filters.dateRange.from) : undefined}
                onSelect={(date) => handleDateChange('from', date ? format(date, 'yyyy-MM-dd') : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[130px] justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {filters.dateRange.to ? format(new Date(filters.dateRange.to), 'PP') : 'To Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={filters.dateRange.to ? new Date(filters.dateRange.to) : undefined}
                onSelect={(date) => handleDateChange('to', date ? format(date, 'yyyy-MM-dd') : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Select
          value={filters.status}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Inspected">Inspected</SelectItem>
            <SelectItem value="Accepted">Accepted</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={String(filters.rowsPerPage)}
          onValueChange={handleRowsPerPageChange}
        >
          <SelectTrigger className="w-[140px]">
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
```