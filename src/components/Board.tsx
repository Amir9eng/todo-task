'use client';

import React, { useMemo } from 'react';
import { MoreHorizontal, MessageSquare, Paperclip, Plus } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { Task, TaskStatus } from '../types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import GhostBackground from './GhostBackground';

const TaskCard = ({ task, index }: { task: Task; index: number }) => {
  const { updateTaskStatus } = useTasks();
  
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-pink-500';
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "bg-white dark:bg-[#1E1E2D] p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group relative",
            snapshot.isDragging && "shadow-2xl scale-[1.02] rotate-2 z-50 ring-2 ring-indigo-500/20"
          )}
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-bold text-[15px] text-gray-900 dark:text-white leading-tight pr-8">{task.title}</h4>
            <button className="absolute top-6 right-6 p-1 rounded-full text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-all">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">{task.description}</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-xs font-bold">
               <div className="flex items-center gap-2 text-gray-400">
                 <div className="flex flex-col gap-[2px] w-3 items-center">
                    <div className="w-full h-[2px] bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-full h-[2px] bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-full h-[2px] bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                 </div>
                 Progress
               </div>
               <span className="text-gray-900 dark:text-gray-200">{Math.round(task.progress / 10)}/10</span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${task.progress}%` }}
                className={`h-full ${getProgressColor(task.progress)} rounded-full`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold",
              task.status === 'done' ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" : 
              task.status === 'in-progress' ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" :
              "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
            )}>
              {task.dueDate}
            </div>
            
            <div className="flex items-center gap-4">
               {/* Avatars */}
               <div className="flex -space-x-2 mr-2">
                 {[1, 2].map((i) => (
                   <div key={i} className="w-7 h-7 rounded-full border-2 border-white dark:border-[#1E1E2D] overflow-hidden bg-gray-100">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Assignee${i + (parseInt(task.id) || 0)}`} alt="Avatar" />
                   </div>
                 ))}
                 <div className="w-7 h-7 rounded-full border-2 border-white dark:border-[#1E1E2D] bg-gray-900 flex items-center justify-center text-[10px] font-bold text-white">
                    +2
                 </div>
               </div>

               <div className="flex items-center gap-3 text-gray-400">
                 <div className="flex items-center gap-1.5">
                   <MessageSquare className="w-4 h-4" />
                   <span className="text-xs font-bold">{task.comments}</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                   <Paperclip className="w-4 h-4" />
                   <span className="text-xs font-bold">{task.attachments}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const Board = () => {
  const { tasks, reorderTasks } = useTasks();

  const columns: { title: string; status: TaskStatus; count: number }[] = [
    { title: 'To do', status: 'todo', count: tasks.filter(t => t.status === 'todo').length },
    { title: 'In progress', status: 'in-progress', count: tasks.filter(t => t.status === 'in-progress').length },
    { title: 'Done', status: 'done', count: tasks.filter(t => t.status === 'done').length },
  ];

  const totalTasks = tasks.length;
  const taskOffset = useMemo(() => {
    if (totalTasks === 0) return 0;
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    const doneCount = tasks.filter(t => t.status === 'done').length;
    // -1 for todo (left), 1 for done (right). Opposite of what user wants for the balls.
    return (doneCount - todoCount) / totalTasks;
  }, [tasks, totalTasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    reorderTasks(
      source.index,
      destination.index,
      source.droppableId as TaskStatus,
      destination.droppableId as TaskStatus
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex-1 bg-[#F7F8FA] dark:bg-[#0D0D14] p-4 sm:p-8 no-scrollbar relative overflow-y-auto overflow-x-auto">
        <GhostBackground />
        <div className="flex flex-row gap-6 sm:gap-8 items-start relative z-10 w-max min-w-full">
          {columns.map((column) => (
            <div key={column.status} className="min-w-[300px] w-[300px] sm:min-w-[360px] sm:w-[360px] flex flex-col gap-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-[15px] text-gray-900 dark:text-white">{column.title} ({column.count})</h3>
                </div>
                <button 
                  onClick={() => {
                    // This could open modal with status preset if AddTaskModal supported it
                    // For now we'll just open it.
                    const addButton = document.querySelector('[data-add-task-btn]') as HTMLButtonElement;
                    addButton?.click();
                  }}
                  className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 text-gray-400 flex items-center justify-center hover:text-indigo-600 shadow-sm border border-gray-100 dark:border-transparent transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <Droppable droppableId={column.status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "flex flex-col gap-5 min-h-[500px] transition-colors rounded-3xl",
                      snapshot.isDraggingOver && "bg-gray-100/50 dark:bg-gray-800/20"
                    )}
                  >
                    {tasks
                      .filter((task) => task.status === column.status)
                      .map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                      ))}
                    {provided.placeholder}
                    
                    {column.status === 'done' && tasks.filter(t => t.status === 'done').length === 0 && (
                      <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[24px] h-[200px] flex flex-col items-center justify-center text-gray-400 text-sm font-bold gap-3 bg-white/50 dark:bg-gray-900/20">
                        <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                          <Plus className="w-6 h-6 text-gray-300" />
                        </div>
                        Drag your task here...
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};


export default Board;
