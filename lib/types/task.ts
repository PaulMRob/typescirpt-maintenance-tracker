export type Status = 'pending' | 'in-progress' | 'done';

export interface Task {
    taskId: string;
    title: string;
    status: Status;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  }