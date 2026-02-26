'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Board from '@/components/Board';
import { useTasks } from '@/context/TaskContext';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import AddTaskModal from '@/components/AddTaskModal';
import SearchModal from '@/components/SearchModal';

export default function Home() {
  const { theme } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsSearchOpen(true);
    window.addEventListener('open-search', handler);
    return () => window.removeEventListener('open-search', handler);
  }, []);

  return (
    <main className="flex min-h-screen bg-white dark:bg-[#1E1E2D] font-sans transition-colors duration-300 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Header />
        
        {/* Layout Tabs / Filter Bar */}
        <div className="px-4 sm:px-8 flex items-center justify-between bg-white dark:bg-[#13131F] border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <button className="px-3 sm:px-4 py-4 sm:py-5 border-b-2 border-gray-900 dark:border-white text-gray-900 dark:text-white text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap">
               <div className="w-4 h-4 rounded border-2 border-gray-900 dark:border-white flex flex-col gap-[1px] p-[1px]">
                  <div className="w-full h-[2px] bg-gray-900 dark:bg-white rounded-full"></div>
                  <div className="w-full h-[2px] bg-gray-900 dark:bg-white rounded-full"></div>
               </div>
               Board view
            </button>
            <button className="px-3 sm:px-4 py-4 sm:py-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Add view
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-8 py-4 sm:py-5 shrink-0 pl-4">
             <div className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-gray-300 cursor-pointer hover:text-indigo-600 transition-all">
               Filter
             </div>
             <div className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-gray-300 cursor-pointer hover:text-indigo-600 transition-all">
               Sort
             </div>
             <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all">
               <MoreHorizontal className="w-5 h-5" />
             </button>
             <button
               onClick={() => setIsModalOpen(true)}
               className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:shadow-lg transition-all whitespace-nowrap"
             >
               New template
             </button>
          </div>
        </div>

        <Board />
      </div>

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </main>
  );
}
