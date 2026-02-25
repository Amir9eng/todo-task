export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  progress: number; // 0-100
  dueDate: string;
  comments: number;
  attachments: number;
  assignees: string[]; // URLs to avatars
  projectName: string;
}

export interface Project {
  id: string;
  name: string;
  taskCount: number;
}
