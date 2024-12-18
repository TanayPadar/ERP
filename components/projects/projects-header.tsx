'use client';

import { ProjectDialog } from './project-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Project } from '@/types/project';
import { useProjects } from '@/lib/hooks/use-projects';

interface ProjectsHeaderProps {
  onProjectAdded?: () => void;
}

export function ProjectsHeader({ onProjectAdded }: ProjectsHeaderProps) {
  const { addProject, isLoading } = useProjects();

  const handleProjectAdd = async (projectData: Partial<Project>) => {
    await addProject(projectData);
    onProjectAdded?.();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Projects List</h1>
        <p className="text-sm text-muted-foreground">Manage and track ongoing projects</p>
      </div>
      <ProjectDialog
        onSave={handleProjectAdd}
        isLoading={isLoading}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Project
          </Button>
        }
      />
    </div>
  );
}