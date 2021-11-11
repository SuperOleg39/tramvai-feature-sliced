import { createReducer, createEvent, useStore } from '@tramvai/state';
import { createAction } from '@tramvai/core';
import { createSelector } from 'reselect';
import type {
  GetTaskByIdParams,
  GetTasksListParams,
  Task,
} from '@shared/api/tasks';
import { TASKS_API_SERVICE } from '@shared/api/tasks';

export interface QueryConfig {
  completed?: boolean;
  userId?: number;
}

export const toggleTask = createEvent<number>('toggle task');
export const setQueryConfig = createEvent<QueryConfig>('set query config');

const getTasksListStart = createEvent<void>('get tasks list start');
const getTasksListSuccess = createEvent<Task[]>('get tasks list success');
const getTaskByIdStart = createEvent<void>('get task by id start');
const getTaskByIdSuccess = createEvent<Task | undefined>(
  'get task by id success'
);

export const getTasksListAction = createAction({
  name: 'get tasks list action',
  fn: async (context, params: GetTasksListParams, { tasksApiService }) => {
    context.dispatch(getTasksListStart());
    const { payload } = await tasksApiService.getTasksList(params);
    context.dispatch(getTasksListSuccess(payload));
  },
  deps: {
    tasksApiService: TASKS_API_SERVICE,
  },
});
export const getTaskByIdAction = createAction({
  name: 'get task by id action',
  fn: async (context, params: GetTaskByIdParams, { tasksApiService }) => {
    context.dispatch(getTaskByIdStart());
    const { payload } = await tasksApiService.getTaskById(params);
    context.dispatch(getTaskByIdSuccess(payload));
  },
  deps: {
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

export const TasksListLoadingStore = createReducer('tasksListLoading', false)
  .on(getTasksListStart, () => true)
  .on(getTasksListSuccess, () => false);

export const TaskDetailsLoadingStore = createReducer(
  'tasksDetailsLoading',
  false
)
  .on(getTaskByIdStart, () => true)
  .on(getTaskByIdSuccess, () => false);

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
