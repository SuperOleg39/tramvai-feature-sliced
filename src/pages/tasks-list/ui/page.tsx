import React from 'react';
import type { Task } from '@shared/api/tasks';
import { TaskRow } from '@entities/task/ui/task-row';
import { TasksFilters } from '@features/tasks-filters/ui';
import { ToggleTask } from '@features/toggle-task/ui';
import { useSelector, useStore } from '@tramvai/state';
import {
  getTasksListAction,
  QueryConfigStore,
  tasksFilteredSelector,
  tasksListEmptySelector,
  TasksListLoadingStore,
  TasksStore,
} from '@entities/task/model';

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
  const tasksFiltered = useSelector(
    [TasksStore, QueryConfigStore] as const,
    tasksFilteredSelector
  );

  return (
    <>
      {tasksFiltered.map((task) => (
        <ListItemView key={task.id} task={task} />
      ))}
    </>
  );
};

const PageContent = () => {
  const isLoading = useStore(TasksListLoadingStore);
  const isEmpty = useSelector(
    [TasksStore, QueryConfigStore] as const,
    tasksListEmptySelector
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isEmpty) {
    return <div>No tasks found</div>;
  }
  return <TasksList />;
};

const TasksListPage = () => {
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

TasksListPage.actions = [getTasksListAction];

export default TasksListPage;
