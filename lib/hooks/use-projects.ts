'use client';

import { useState } from 'react';
import { Project } from '@/types/project';
import { addProject, updateProject, deleteProject } from '@/lib/projects';
import { toast } from 'sonner';

export function useProjects() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProject = async (projectData: Partial<Project>) => {
    setIsLoading(true);
    try {
      const newProject = addProject(projectData);
      toast.success('Project created successfully');
      return newProject;
    } catch (error) {
      toast.error('Failed to create project');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProject = async (id: number, projectData: Partial<Project>) => {
    setIsLoading(true);
    try {
      const updatedProject = updateProject(id, projectData);
      toast.success('Project updated successfully');
      return updatedProject;
    } catch (error) {
      toast.error('Failed to update project');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteProject(id);
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Failed to delete project');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addProject: handleAddProject,
    updateProject: handleUpdateProject,
    deleteProject: handleDeleteProject,
  };
}