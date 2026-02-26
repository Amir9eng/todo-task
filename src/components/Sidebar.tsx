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
import TaskCube from './TaskCube';
import TaskProgress3D from './TaskProgress3D';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const { theme, setTheme, projects } = useTasks();
  const [isOpen, setIsOpen] = React.useState(false);

  // Listen for custom event from Header
  React.useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, []);

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

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out bg-white dark:bg-[#0D0D14] border-r border-gray-100 dark:border-gray-800",
    "lg:static lg:translate-x-0 lg:w-[280px] lg:block",
    isOpen ? "translate-x-0 w-full sm:w-[320px]" : "-translate-x-full w-0"
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex h-full relative">
          {/* Close button for mobile */}
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Plus className="w-6 h-6 rotate-45" />
          </button>

          {/* Narrow Icon Rail */}
          <div className="w-[60px] sm:w-[72px] border-r border-gray-100/10 flex flex-col items-center py-6 gap-8 bg-[#0D0D14] shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-800 flex items-center justify-center mb-2 shadow-lg">
              <Layers className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            
            <div className="flex flex-col gap-5 sm:gap-6">
              {navIcons.map((item, i) => (
                <button
                  key={i}
                  className={cn(
                    "p-2 sm:p-2.5 rounded-xl transition-all",
                    item.active 
                      ? "bg-gray-800 text-white shadow-sm" 
                      : "text-gray-500 hover:bg-gray-800/50 hover:text-gray-300"
                  )}
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              ))}
            </div>

            <div className="mt-auto">
               <button className="p-2 text-gray-500 hover:text-white transition-all">
                  <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
               </button>
            </div>
          </div>

          {/* Main Sidebar Content */}
          <div className="flex-1 flex flex-col py-6 sm:py-8 px-4 sm:px-6 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h2>
              <button 
                data-add-task-btn
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-8 sm:mb-10">
               <div className="bg-gray-50 dark:bg-[#1E1E2D] rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mb-1">Project Health</div>
                    <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">Task Velocity</div>
                    <div className="h-40 -mx-4 scale-90 sm:scale-100 origin-center">
                      <TaskCube />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />
               </div>
            </div>

            <div className="space-y-8 sm:space-y-10">
              {/* Projects Section */}
              <div>
                <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                  <span>Projects</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="space-y-1">
                  {projectsMenu.map((item) => (
                    <button
                      key={item.label}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all group/item",
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
                <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                  <span>Tasks</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="space-y-1">
                  {tasksMenu.map((item) => (
                    <button
                      key={item.label}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all",
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

              {/* Project Health Orb Bottom */}
              <div>
                 <div className="bg-gray-50 dark:bg-[#1E1E2D] rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mb-1">Project Health</div>
                      <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">Task Velocity</div>
                      <div className="h-32 -mx-4 scale-90 sm:scale-100 origin-center">
                        <TaskProgress3D />
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />
                 </div>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="mt-auto pt-8">
              <div className="flex items-center bg-gray-50 dark:bg-[#1E1E2D] p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <button 
                  onClick={() => setTheme('light')}
                  className={cn(
                     "flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all",
                     theme === 'light' ? "bg-white text-gray-900 shadow-sm border border-gray-100" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Light</span>
                </button>
                <button 
                  onClick={() => setTheme('dark')}
                  className={cn(
                     "flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all",
                     theme === 'dark' ? "bg-[#2D2D3F] text-white shadow-sm border border-gray-700" : "text-gray-400 hover:text-gray-400"
                  )}
                >
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Dark</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
