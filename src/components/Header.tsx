import { Search, Bell, Calendar as CalendarIcon, Menu } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const Header = () => {
  const toggleSidebar = () => {
    window.dispatchEvent(new CustomEvent('toggle-sidebar'));
  };

  return (
    <header className="h-[70px] sm:h-[100px] border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#13131F] px-4 sm:px-8 flex items-center justify-between transition-all duration-300 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl sm:text-[28px] font-bold text-gray-900 dark:text-white leading-tight truncate max-w-[150px] sm:max-w-none">
          Welcome back, Vincent 👋
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-8">
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <Search className="w-5 h-5" />
          </button>
          <button className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white dark:border-[#13131F]"></span>
          </button>
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all text-gray-400 font-bold text-xs sm:text-sm">
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">19 May 2022</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-md">
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
