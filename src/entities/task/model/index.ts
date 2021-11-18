import { createReducer, createEvent, useStore } from '@tramvai/state';
import { createQuery } from '@tramvai/react-query';
import { createSelector } from 'reselect';
import type {
  GetTaskByIdParams,
  GetTasksListParams,
  Task,
} from '@shared/api/tasks';
import { TASKS_API_SERVICE } from '@shared/api/tasks';
import { STORE_TOKEN } from '@tramvai/tokens-common';

export interface QueryConfig {
  completed?: boolean;
  userId?: number;
}

export const toggleTask = createEvent<number>('toggle task');
export const setQueryConfig = createEvent<QueryConfig>('set query config');

const getTasksListSuccess = createEvent<Task[]>('get tasks list success');
const getTaskByIdSuccess = createEvent<Task | undefined>(
  'get task by id success'
);

export const getTasksListQuery = createQuery({
  key: 'getTasksList',
  fn: async (params: GetTasksListParams, { store, tasksApiService }) => {
    const { payload } = await tasksApiService.getTasksList(params);
    store.dispatch(getTasksListSuccess(payload));
    return payload;
  },
  deps: {
    store: STORE_TOKEN,
    tasksApiService: TASKS_API_SERVICE,
  },
});

export const getTaskByIdQuery = createQuery({
  key: (params: GetTaskByIdParams) =>
    ['getTaskById', params.taskId].filter(Boolean),
  fn: async (params: GetTaskByIdParams, { store, tasksApiService }) => {
    const { payload } = await tasksApiService.getTaskById(params);
    store.dispatch(getTaskByIdSuccess(payload));
    return payload;
  },
  deps: {
    store: STORE_TOKEN,
    tasksApiService: TASKS_API_SERVICE,
  },
});

const tasksInitialState: Record<number, Task> = {};

export const TasksStore = createReducer('tasks', tasksInitialState)
  .on(getTasksListSuccess, (state, tasks) => {
    return {
      ...state,
      ...tasks.reduce((record, task) => {
        // eslint-disable-next-line no-param-reassign
        record[task.id] = task;
        return record;
      }, {} as Record<number, Task>),
    };
  })
  .on(getTaskByIdSuccess, (state, task) => {
    if (!task) {
      return state;
    }
    return {
      ...state,
      [task.id]: task,
    };
  })
  .on(toggleTask, (state, taskId) => {
    const task = state[taskId];
    if (!task) {
      return state;
    }
    return {
      ...state,
      [taskId]: {
        ...task,
        completed: !task.completed,
      },
    };
  });

const queryConfigInitialState: QueryConfig = {};

export const QueryConfigStore = createReducer(
  'queryConfig',
  queryConfigInitialState
).on(setQueryConfig, (_, payload) => payload);

export const tasksListSelector = createSelector(
  (state: { tasks: Record<number, Task> }) => state.tasks,
  (tasks) => Object.values(tasks)
);

export const tasksFilteredSelector = createSelector(
  tasksListSelector,
  (state: { queryConfig: QueryConfig }) => state.queryConfig,
  (tasksList, queryConfig) => {
    return tasksList.filter(
      (task) =>
        queryConfig.completed === undefined ||
        task.completed === queryConfig.completed
    );
  }
);

export const tasksListEmptySelector = createSelector(
  tasksFilteredSelector,
  (tasksFiltered) => tasksFiltered.length === 0
);

export const useTask = (taskId: number): Task | undefined => {
  return useStore(TasksStore)[taskId];
};
