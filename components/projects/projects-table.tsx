'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Project } from '@/types/project';
import { projects } from '@/lib/projects';
import { ProjectDialog } from './project-dialog';
import { useState } from 'react';
import { useProjects } from '@/lib/hooks/use-projects';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';

interface ProjectsTableProps {
  onProjectUpdate: (id: number, data: Partial<Project>) => Promise<void>;
  onProjectDelete: (id: number) => Promise<void>;
}

function ProjectStatusBadge({ status }: { status: Project['status'] }) {
  const colors = {
    'Planning': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'On Hold': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Project['priority'] }) {
  const colors = {
    'Low': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'High': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
      {priority}
    </span>
  );
}

export function ProjectsTable({ onProjectUpdate, onProjectDelete }: ProjectsTableProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isLoading } = useProjects();

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.projectNo}</TableCell>
                <TableCell>{format(new Date(project.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{project.clientName}</TableCell>
                <TableCell className="max-w-[200px] truncate">{project.title}</TableCell>
                <TableCell>
                  <ProjectStatusBadge status={project.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={project.priority} />
                </TableCell>
                <TableCell>
                  <div className="w-[100px]">
                    <Progress value={project.progress} className="h-2" />
                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>₹{project.value.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <ProjectDialog
                      project={project}
                      onSave={(data) => onProjectUpdate(project.id, data)}
                      isLoading={isLoading}
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onProjectDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}