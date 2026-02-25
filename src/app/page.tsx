'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Board from '@/components/Board';
import { useTasks } from '@/context/TaskContext';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useState } from 'react';
import AddTaskModal from '@/components/AddTaskModal';

export default function Home() {
  const { theme } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen bg-white dark:bg-[#1E1E2D] font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        {/* Layout Tabs / Filter Bar */}
        <div className="px-8 flex items-center justify-between bg-white dark:bg-[#13131F] border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <button className="px-4 py-5 border-b-2 border-gray-900 dark:border-white text-gray-900 dark:text-white text-sm font-bold flex items-center gap-2 transition-all">
               <div className="w-4 h-4 rounded border-2 border-gray-900 dark:border-white flex flex-col gap-[1px] p-[1px]">
                  <div className="w-full h-[2px] bg-gray-900 dark:bg-white rounded-full"></div>
                  <div className="w-full h-[2px] bg-gray-900 dark:bg-white rounded-full"></div>
               </div>
               Board view
            </button>
            <button className="px-4 py-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold flex items-center gap-2 transition-all">
              <Plus className="w-4 h-4" />
              Add view
            </button>
          </div>

          <div className="flex items-center gap-8 py-5">
             <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-gray-300 cursor-pointer hover:text-indigo-600 transition-all">
               Filter
             </div>
             <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-gray-300 cursor-pointer hover:text-indigo-600 transition-all">
               Sort
             </div>
             <button className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all">
               <MoreHorizontal className="w-5 h-5" />
             </button>
             <button 
               onClick={() => setIsModalOpen(true)}
               className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all"
             >
               New template
             </button>
          </div>
        </div>

        <Board />
      </div>

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
