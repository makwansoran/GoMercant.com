'use client';

import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import {
  Folder,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Calendar,
  Users,
  Search,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'submitted' | 'reviewed';
  progress: number;
  dueDate: string;
  members: number;
  tasks: { total: number; completed: number };
}

type FilterType = 'all' | 'active' | 'submitted' | 'reviewed';

const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'submitted', label: 'Submitted' },
  { id: 'reviewed', label: 'Reviewed' },
];

interface ProjectsProps {
  onNavigate?: (view: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onNavigate }) => {
  const [projects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.status === activeFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'submitted':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'reviewed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-700';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-700';
      case 'reviewed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full px-4 py-6 pb-24 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
          </div>

          {/* Filter Tabs */}
          <LayoutGroup>
            <div className="flex gap-6">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className="relative py-2 text-sm font-medium transition-colors"
                >
                  <span className={activeFilter === filter.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}>
                    {filter.label}
                  </span>
                  {activeFilter === filter.id && (
                    <motion.div
                      layoutId="projectsActiveTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </LayoutGroup>

          {/* Projects List */}
          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Folder className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">You have no projects yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Browse procurements and find opportunities that match your skills.
                  </p>
                  <Button onClick={() => onNavigate?.('missions')}>
                    <Search className="h-4 w-4 mr-2" />
                    Browse Procurements
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Folder className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{project.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {project.description}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Project</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(project.status)}>
                            {getStatusIcon(project.status)}
                            <span className="ml-1 capitalize">{project.status}</span>
                          </Badge>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{project.members}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <CheckCircle className="h-4 w-4" />
                            <span>{project.tasks.completed}/{project.tasks.total}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(project.dueDate)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
