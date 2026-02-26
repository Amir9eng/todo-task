'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../context/TaskContext';
import { Task } from '../types';

const statusColors: Record<Task['status'], string> = {
  'todo': 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
  'in-progress': 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
  'done': 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
};

const statusLabels: Record<Task['status'], string> = {
  'todo': 'To do',
  'in-progress': 'In progress',
  'done': 'Done',
};

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { tasks } = useTasks();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.projectName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-white dark:bg-[#1E1E2D] rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks, projects..."
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
              {query.trim() === '' && (
                <div className="py-12 text-center text-sm text-gray-400">
                  Start typing to search tasks...
                </div>
              )}

              {query.trim() !== '' && filtered.length === 0 && (
                <div className="py-12 text-center text-sm text-gray-400">
                  No results for <span className="font-semibold text-gray-600 dark:text-gray-300">"{query}"</span>
                </div>
              )}

              {filtered.length > 0 && (
                <ul className="p-2">
                  {filtered.map((task) => (
                    <li key={task.id}>
                      <button
                        onClick={onClose}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group text-left"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{task.title}</p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">{task.description} · {task.projectName}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${statusColors[task.status]}`}>
                          {statusLabels[task.status]}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors shrink-0" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4 text-[11px] text-gray-400">
              <span><kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">Esc</kbd> to close</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">↵</kbd> to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
