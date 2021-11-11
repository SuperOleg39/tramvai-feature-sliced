import type { Task } from '@shared/api/tasks';

export const getTaskStatus = (data: Task) => {
  return data.completed ? 'CLOSED' : 'OPENED';
};
