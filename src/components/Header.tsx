'use client';

import React from 'react';
import { Search, Bell, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-[100px] border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#13131F] px-8 flex items-center justify-between transition-colors duration-300">
      <div>
        <h1 className="text-[28px] font-bold text-gray-900 dark:text-white leading-tight">Welcome back, Vincent 👋</h1>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white dark:border-[#13131F]"></span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all text-gray-400 font-bold text-sm">
            <CalendarIcon className="w-5 h-5" />
            <span>19 May 2022</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vincent" 
              alt="User" 
              className="w-full h-full object-cover bg-indigo-100"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
