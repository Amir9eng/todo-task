'use client';

import { useState } from 'react';
import { useTasks } from '@/context/TaskContext';
import { Sun, Moon, ArrowLeft, User, Bell, Shield, Palette, Trash2, Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const sections = ['Profile', 'Appearance', 'Notifications', 'Privacy'] as const;
type Section = typeof sections[number];

const sectionIcons: Record<Section, React.ComponentType<{ className?: string }>> = {
  Profile: User,
  Appearance: Palette,
  Notifications: Bell,
  Privacy: Shield,
};

export default function SettingsPage() {
  const { theme, setTheme, tasks, deleteTask } = useTasks();
  const [active, setActive] = useState<Section>('Profile');

  // Profile state (local only — no persistence needed beyond demo)
  const [name, setName] = useState('Vincent');
  const [email, setEmail] = useState('vincent@example.com');
  const [saved, setSaved] = useState(false);

  // Notification toggles
  const [notifs, setNotifs] = useState({
    taskUpdates: true,
    dueDateReminders: true,
    newComments: false,
    weeklyDigest: true,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const completedCount = tasks.filter(t => t.status === 'done').length;
  const totalCount = tasks.length;

  return (
    <div className={cn('min-h-screen bg-[#F7F8FA] dark:bg-[#0D0D14] font-sans transition-colors duration-300')}>
      {/* Top bar */}
      <header className="h-[70px] sm:h-[80px] bg-white dark:bg-[#13131F] border-b border-gray-100 dark:border-gray-800 px-4 sm:px-8 flex items-center gap-4 sticky top-0 z-40">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-bold hidden sm:inline">Back to Board</span>
        </Link>
        <div className="w-px h-6 bg-gray-100 dark:bg-gray-800" />
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row gap-6">
        {/* Sidebar nav */}
        <nav className="sm:w-52 shrink-0">
          <ul className="flex sm:flex-col gap-1 overflow-x-auto no-scrollbar sm:overflow-visible pb-2 sm:pb-0">
            {sections.map((s) => {
              const Icon = sectionIcons[s];
              return (
                <li key={s} className="shrink-0 sm:shrink">
                  <button
                    onClick={() => setActive(s)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all w-full whitespace-nowrap',
                      active === s
                        ? 'bg-white dark:bg-[#1E1E2D] text-gray-900 dark:text-white shadow-sm border border-gray-100 dark:border-gray-800'
                        : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/30'
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {s}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Content panel */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="flex-1 bg-white dark:bg-[#1E1E2D] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
        >
          {/* ── Profile ── */}
          {active === 'Profile' && (
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Profile</h2>
                <p className="text-sm text-gray-400">Manage your name and email address.</p>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md shrink-0">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                    alt="Avatar"
                    className="w-full h-full bg-indigo-100"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{name || 'Your Name'}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{email}</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Display Name</label>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-gray-900 dark:text-white"
                  />
                </div>

                {/* Task summary (read-only) */}
                <div className="flex gap-4 pt-2">
                  {[
                    { label: 'Total tasks', value: totalCount },
                    { label: 'Completed', value: completedCount },
                    { label: 'In progress', value: tasks.filter(t => t.status === 'in-progress').length },
                  ].map(stat => (
                    <div key={stat.label} className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className={cn(
                    'flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-2xl text-sm font-bold transition-all',
                    saved
                      ? 'bg-green-500 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                  )}
                >
                  {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save changes'}
                </button>
              </form>
            </div>
          )}

          {/* ── Appearance ── */}
          {active === 'Appearance' && (
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Appearance</h2>
                <p className="text-sm text-gray-400">Choose how the app looks and feels.</p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Theme</p>
                <div className="grid grid-cols-2 gap-3">
                  {(['light', 'dark'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={cn(
                        'relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all',
                        theme === t
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                      )}
                    >
                      {theme === t && (
                        <span className="absolute top-3 right-3 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </span>
                      )}
                      {t === 'light' ? <Sun className="w-6 h-6 text-orange-400" /> : <Moon className="w-6 h-6 text-indigo-400" />}
                      <span className="text-sm font-bold text-gray-900 dark:text-white capitalize">{t}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent colour (visual only) */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Accent colour</p>
                <div className="flex gap-3">
                  {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'].map(c => (
                    <button
                      key={c}
                      className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#1E1E2D] transition-all hover:scale-110 first:ring-indigo-500"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Notifications ── */}
          {active === 'Notifications' && (
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Notifications</h2>
                <p className="text-sm text-gray-400">Control what you get notified about.</p>
              </div>

              <div className="space-y-2">
                {(Object.keys(notifs) as (keyof typeof notifs)[]).map(key => {
                  const labels: Record<keyof typeof notifs, { title: string; desc: string }> = {
                    taskUpdates: { title: 'Task updates', desc: 'Get notified when a task status changes' },
                    dueDateReminders: { title: 'Due date reminders', desc: 'Reminders before a task is due' },
                    newComments: { title: 'New comments', desc: 'Notifications for comments on your tasks' },
                    weeklyDigest: { title: 'Weekly digest', desc: 'A summary of your week every Monday' },
                  };
                  return (
                    <div key={key} className="flex items-center justify-between py-4 border-b border-gray-50 dark:border-gray-800 last:border-0">
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{labels[key].title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{labels[key].desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifs(prev => ({ ...prev, [key]: !prev[key] }))}
                        className={cn(
                          'relative w-11 h-6 rounded-full transition-colors shrink-0',
                          notifs[key] ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'
                        )}
                      >
                        <span
                          className={cn(
                            'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                            notifs[key] && 'translate-x-5'
                          )}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Privacy ── */}
          {active === 'Privacy' && (
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Privacy</h2>
                <p className="text-sm text-gray-400">Manage your data and account.</p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Data</p>
                <button
                  onClick={() => {
                    if (confirm('Clear all completed tasks? This cannot be undone.')) {
                      tasks.filter(t => t.status === 'done').forEach(t => deleteTask(t.id));
                    }
                  }}
                  className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all group text-left"
                >
                  <Trash2 className="w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">Clear completed tasks</p>
                    <p className="text-xs text-gray-400 group-hover:text-red-400 mt-0.5">Remove all {completedCount} completed task{completedCount !== 1 ? 's' : ''} permanently</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Reset all data? This will clear all tasks and projects.')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all group text-left"
                >
                  <Trash2 className="w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">Reset all data</p>
                    <p className="text-xs text-gray-400 group-hover:text-red-400 mt-0.5">Wipes all tasks and projects from local storage</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
