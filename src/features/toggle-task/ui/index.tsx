import React from 'react';
import { getTaskStatus } from '@entities/task/lib';
import { useDi } from '@tramvai/react';
import { TASK_ENTITY_REPOSITORY } from '@entities/task';

export interface ToggleTaskProps {
  taskId: number;
  withStatus?: boolean;
}

export const ToggleTask = ({ taskId, withStatus = true }: ToggleTaskProps) => {
  const taskEntityRepository = useDi(TASK_ENTITY_REPOSITORY);
  const task = taskEntityRepository.useTask(taskId);

  if (!task) {
    return null;
  }

  const status = getTaskStatus(task);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={() => taskEntityRepository.toggleTask(taskId)}
          checked={task.completed}
        />
        {withStatus && status}
      </label>
    </div>
  );
};
