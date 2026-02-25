'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, Project, TaskStatus } from '../types';

interface TaskContextType {
  tasks: Task[];
  projects: Project[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  deleteTask: (taskId: string) => void;
  reorderTasks: (startIndex: number, endIndex: number, sourceStatus: TaskStatus, destinationStatus: TaskStatus) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design new ui presentation',
    description: 'Dribbble marketing',
    status: 'todo',
    progress: 70,
    dueDate: '24 Aug 2022',
    comments: 7,
    attachments: 2,
    assignees: [],
    projectName: 'Design system',
  },
  {
    id: '2',
    title: 'Design system update',
    description: 'Oreo website project',
    status: 'in-progress',
    progress: 30,
    dueDate: '12 Nov 2022',
    comments: 0,
    attachments: 0,
    assignees: [],
    projectName: 'Design system',
  },
  {
    id: '3',
    title: 'Add product to the market',
    description: 'Ui8 marketplace',
    status: 'done',
    progress: 100,
    dueDate: '6 Jan 2022',
    comments: 1,
    attachments: 5,
    assignees: [],
    projectName: 'Design system',
  },
];

const initialProjects: Project[] = [
  { id: '1', name: 'Design system', taskCount: 3 },
  { id: '2', name: 'User flow', taskCount: 0 },
  { id: '3', name: 'Ux research', taskCount: 0 },
];

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedProjects = localStorage.getItem('projects');
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist other data
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [tasks, projects]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTasks((prev) => [...prev, newTask]);
    
    // Update project count
    setProjects(prev => prev.map(p => 
      p.name === task.projectName ? { ...p, taskCount: p.taskCount + 1 } : p
    ));
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status, progress: status === 'done' ? 100 : t.progress } : t))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const reorderTasks = (startIndex: number, endIndex: number, sourceStatus: TaskStatus, destinationStatus: TaskStatus) => {
    setTasks((prev) => {
      const sourceTasks = prev.filter(t => t.status === sourceStatus);
      const draggedTask = sourceTasks[startIndex];
      
      if (!draggedTask) return prev;

      // Create a copy of the tasks without the dragged one
      const remainingTasks = prev.filter(t => t.id !== draggedTask.id);
      
      // Update the status
      const updatedTask = { 
        ...draggedTask, 
        status: destinationStatus,
        progress: destinationStatus === 'done' ? 100 : draggedTask.progress
      };

      // Re-insert at the correct position
      const destTasks = remainingTasks.filter(t => t.status === destinationStatus);
      const newTasks = [...remainingTasks];
      
      let insertIndex = newTasks.length;
      if (endIndex < destTasks.length) {
        // Insert before the task that is currently at the destination index
        const referenceTask = destTasks[endIndex];
        insertIndex = newTasks.findIndex(t => t.id === referenceTask.id);
      } else if (destTasks.length > 0) {
        // Insert after the last task of the destination status
        const lastDestTask = destTasks[destTasks.length - 1];
        insertIndex = newTasks.findIndex(t => t.id === lastDestTask.id) + 1;
      }

      newTasks.splice(insertIndex, 0, updatedTask);
      return newTasks;
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        projects,
        addTask,
        updateTaskStatus,
        deleteTask,
        reorderTasks,
        theme,
        setTheme,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};
