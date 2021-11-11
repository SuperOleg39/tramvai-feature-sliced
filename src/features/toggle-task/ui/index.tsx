import React from 'react';
import { useConsumerContext } from '@tramvai/state';
import { useTask, toggleTask } from '@entities/task/model';
import { getTaskStatus } from '@entities/task/lib';

export interface ToggleTaskProps {
  taskId: number;
  withStatus?: boolean;
}

export const ToggleTask = ({ taskId, withStatus = true }: ToggleTaskProps) => {
  const task = useTask(taskId);
  const context = useConsumerContext();

  if (!task) {
    return null;
  }

  const status = getTaskStatus(task);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={() => context.dispatch(toggleTask(taskId))}
          checked={task.completed}
        />
        {withStatus && status}
      </label>
    </div>
  );
};
