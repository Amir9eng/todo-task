'use client';

import React from 'react';
import { 
  LayoutGrid, 
  Users, 
  Layers, 
  Calendar, 
  Cloud, 
  Hash, 
  Settings, 
  Plus, 
  LogOut,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import ProgressOrb from './ProgressOrb';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const { theme, setTheme, projects } = useTasks();

  const navIcons = [
    { icon: LayoutGrid, active: true },
    { icon: Users },
    { icon: Calendar },
    { icon: Layers },
    { icon: Cloud },
    { icon: Hash },
    { icon: Settings },
  ];

  const projectsMenu = [
    { label: 'All projects', count: 3 },
    { label: 'Design system', count: 1, active: true },
    { label: 'User flow', count: 0 },
    { label: 'Ux research', count: 0 },
  ];

  const tasksMenu = [
    { label: 'All tasks', count: 11 },
    { label: 'To do', count: 4 },
    { label: 'In progress', count: 4, active: true },
    { label: 'Done', count: 3 },
  ];

  return (
    <aside className="w-[280px] border-r border-gray-100 dark:border-gray-800 flex flex-col h-screen bg-white dark:bg-[#0D0D14] sticky top-0 transition-colors duration-300">
      <div className="flex h-full">
        {/* Narrow Icon Rail */}
        <div className="w-[72px] border-r border-gray-100/10 flex flex-col items-center py-6 gap-8 bg-[#0D0D14]">
          <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center mb-2 shadow-lg">
            <Layers className="text-white w-6 h-6" />
          </div>
          
          <div className="flex flex-col gap-6">
            {navIcons.map((item, i) => (
              <button
                key={i}
                className={cn(
                  "p-2.5 rounded-xl transition-all",
                  item.active 
                    ? "bg-gray-800 text-white shadow-sm" 
                    : "text-gray-500 hover:bg-gray-800/50 hover:text-gray-300"
                )}
              >
                <item.icon className="w-6 h-6" />
              </button>
            ))}
          </div>

          <div className="mt-auto">
             <button className="p-2.5 text-gray-500 hover:text-white transition-all">
                <LogOut className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* Main Sidebar Content */}
        <div className="flex-1 flex flex-col py-8 px-6 overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h2>
            <button 
              data-add-task-btn
              className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-10 px-2">
             <div className="bg-gray-50 dark:bg-[#1E1E2D] rounded-[32px] p-6 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mb-1">Project Health</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-4">Task Velocity</div>
                  <div className="h-40 -mx-4">
                    <ProgressOrb />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />
             </div>
          </div>

          <div className="space-y-10">
            {/* Team Section */}
            <div>
               <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  <span>Team</span>
                  <ChevronDown className="w-4 h-4" />
               </div>
            </div>

            {/* Projects Section */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                <span>Projects</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                {projectsMenu.map((item) => (
                  <button
                    key={item.label}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-bold transition-all group/item",
                      item.active 
                        ? "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" 
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    )}
                  >
                    <span>{item.label} ({item.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tasks Section */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                <span>Tasks</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                {tasksMenu.map((item) => (
                  <button
                    key={item.label}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-bold transition-all",
                      item.active 
                        ? "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" 
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    )}
                  >
                    <span>{item.label} ({item.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Other Sections */}
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Reminders</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Messengers</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Project Health Orb */}
            <div className="px-2">
               <div className="bg-gray-50 dark:bg-[#1E1E2D] rounded-[32px] p-6 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mb-1">Project Health</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white mb-4">Task Velocity</div>
                    <div className="h-40 -mx-4">
                      <ProgressOrb />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />
               </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="mt-auto pt-10">
            <div className="flex items-center bg-gray-50 dark:bg-[#1E1E2D] p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => setTheme('light')}
                className={cn(
                   "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all",
                   theme === 'light' ? "bg-white text-gray-900 shadow-sm border border-gray-100" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <Sun className="w-4 h-4" />
                <span>Light</span>
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={cn(
                   "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all",
                   theme === 'dark' ? "bg-[#2D2D3F] text-white shadow-sm border border-gray-700" : "text-gray-400 hover:text-gray-400"
                )}
              >
                <Moon className="w-4 h-4" />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
