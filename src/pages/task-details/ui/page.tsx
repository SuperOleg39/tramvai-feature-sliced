import { TASK_ENTITY_REPOSITORY } from '@entities/task';
import { TaskCard } from '@entities/task/ui';
import { ToggleTask } from '@features/toggle-task/ui';
import { Link } from '@tinkoff/router';
import { useDi } from '@tramvai/react';
import { PAGE_SERVICE_TOKEN } from '@tramvai/tokens-router';
import React from 'react';
import { loadTaskToCurrentRoute } from '../model';

export const TaskDetailsPage = () => {
  const pageService = useDi(PAGE_SERVICE_TOKEN);
  const taskEntityRepository = useDi(TASK_ENTITY_REPOSITORY);
  const taskId = Number(pageService.getCurrentRoute().params.taskId);
  const task = taskEntityRepository.useTask(taskId);
  const { isLoading } = taskEntityRepository.useGetTaskByIdQuery({ taskId });

  if (!task && !isLoading) {
    // @todo: 404 status on server!
    return (
      <>
        <h1>404</h1>
        <h2>Task was not found</h2>
        <p>
          <Link url="/">Back to tasks list {taskId}</Link>
        </p>
      </>
    );
  }
  return (
    <div>
      <div>
        <TaskCard
          data={task}
          loading={isLoading}
          extra={<Link url="/">Back to TasksList</Link>}
          action={<ToggleTask taskId={taskId} />}
        />
      </div>
    </div>
  );
};

TaskDetailsPage.actions = [loadTaskToCurrentRoute];

export default TaskDetailsPage;
