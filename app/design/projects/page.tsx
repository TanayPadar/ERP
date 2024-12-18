'use client';

import { useState, useCallback } from 'react';
import { ProjectsHeader } from '@/components/projects/projects-header';
import { ProjectsTable } from '@/components/projects/projects-table';
import { ProjectsFilter } from '@/components/projects/projects-filter';
import { ProjectFilters } from '@/types/project';
import { useProjects } from '@/lib/hooks/use-projects';

export default function ProjectsPage() {
  const [filters, setFilters] = useState<ProjectFilters>({
    search: '',
    status: 'all',
    priority: 'all',
    dateRange: {
      from: '',
      to: '',
    },
    rowsPerPage: 10,
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const { updateProject, deleteProject } = useProjects();

  const handleProjectUpdate = async (id: number, projectData: any) => {
    await updateProject(id, projectData);
    setRefreshKey(prev => prev + 1);
  };

  const handleProjectDelete = async (id: number) => {
    await deleteProject(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleProjectAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="space-y-6">
      <ProjectsHeader onProjectAdded={handleProjectAdded} />
      <ProjectsFilter
        filters={filters}
        onFiltersChange={setFilters}
      />
      <ProjectsTable
        key={refreshKey}
        onProjectUpdate={handleProjectUpdate}
        onProjectDelete={handleProjectDelete}
      />
    </div>
  );
}