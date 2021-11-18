import React from 'react';
import type { Task } from '@shared/api/tasks';
import { TaskRow } from '@entities/task/ui/task-row';
import { TasksFilters } from '@features/tasks-filters/ui';
import { ToggleTask } from '@features/toggle-task/ui';
import { getTasksListQuery } from '@entities/task/model';
import { useDi } from '@tramvai/react';
import { TASK_ENTITY_REPOSITORY } from '@entities/task';

const ListItemView: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div>
      <TaskRow
        data={task}
        titleHref={`/${task.id}`}
        before={<ToggleTask taskId={task.id} withStatus={false} />}
      />
    </div>
  );
};

const TasksList = () => {
  const taskEntityRepository = useDi(TASK_ENTITY_REPOSITORY);
  const tasksFiltered = taskEntityRepository.useTasksFiltered();

  return (
    <>
      {tasksFiltered.map((task) => (
        <ListItemView key={task.id} task={task} />
      ))}
    </>
  );
};

const PageContent = () => {
  const taskEntityRepository = useDi(TASK_ENTITY_REPOSITORY);

  const { isLoading } = taskEntityRepository.useGetTasksListQuery();
  const isEmpty = taskEntityRepository.useTasksListEmpty();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isEmpty) {
    return <div>No tasks found</div>;
  }
  return <TasksList />;
};

export const TasksListPage = () => {
  return (
    <div>
      <div>
        <div>
          <h1>Tasks List</h1>
        </div>
        <div>
          <TasksFilters />
        </div>
      </div>
      <div>
        <div>
          <PageContent />
        </div>
      </div>
    </div>
  );
};

TasksListPage.actions = [getTasksListQuery.prefetchAction()];

export default TasksListPage;
