export interface Task {
    taskId: string;
    title: string;
    status: 'pending' | 'in-progress' | 'done';
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  }