"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Palette,
  Users,
  Clock,
  Star
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Website Redesign",
    description: "Complete overhaul of the company website with modern design principles",
    status: "In Progress",
    team: 5,
    progress: 65,
    dueDate: "Dec 15, 2024",
    priority: "High",
  },
  {
    id: 2,
    title: "Mobile App UI",
    description: "Design system and UI components for the new mobile application",
    status: "Completed",
    team: 3,
    progress: 100,
    dueDate: "Nov 30, 2024",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Brand Identity",
    description: "New brand guidelines and visual identity system",
    status: "Planning",
    team: 4,
    progress: 25,
    dueDate: "Jan 15, 2025",
    priority: "High",
  },
  {
    id: 4,
    title: "E-commerce Platform",
    description: "Design and implementation of the new e-commerce platform",
    status: "In Progress",
    team: 6,
    progress: 45,
    dueDate: "Feb 1, 2025",
    priority: "Medium",
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-white/60">Manage and track your creative projects</p>
        </div>
        <Button className="bg-white hover:bg-white/90 text-black">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>
        <Button variant="outline" className="border-white/10 text-white/60 hover:text-white">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="p-6 bg-white/5 border-white/10">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-white/60">{project.description}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-white/40 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              {/* Status and Priority */}
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  project.status === "Completed" 
                    ? "bg-green-500/10 text-green-500"
                    : project.status === "In Progress"
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-yellow-500/10 text-yellow-500"
                }`}>
                  {project.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  project.priority === "High"
                    ? "bg-red-500/10 text-red-500"
                    : "bg-yellow-500/10 text-yellow-500"
                }`}>
                  {project.priority} Priority
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Progress</span>
                  <span className="text-white">{project.progress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Team and Due Date */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <Users className="h-4 w-4" />
                  {project.team} members
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="h-4 w-4" />
                  {project.dueDate}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 