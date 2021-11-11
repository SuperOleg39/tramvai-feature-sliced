import { createToken } from '@tinkoff/dippy';
import { Module, provide } from '@tramvai/core';
import type { HttpClientResponse } from '@tramvai/http-client';
import { ApiService } from '@tramvai/http-client';
import { HttpClientModule } from '@tramvai/module-http-client';
import { HTTP_CLIENT } from '@tramvai/tokens-http-client';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface Task {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export interface GetTasksListParams {
  userId?: number;
  completed?: boolean;
}

export interface GetTaskByIdParams {
  taskId: number;
}

export class TasksApiService extends ApiService {
  tasks: Map<number, Task> = new Map([
    [0, { id: 0, title: 'make foo', userId: 0, completed: false }],
    [1, { id: 1, title: 'make bar', userId: 0, completed: false }],
    [2, { id: 2, title: 'query', userId: 0, completed: true }],
    [3, { id: 3, title: 'React', userId: 1, completed: false }],
    [4, { id: 4, title: 'waaaagh', userId: 1, completed: true }],
  ]);

  async getTasksList(
    params?: GetTasksListParams
  ): Promise<HttpClientResponse<Task[]>> {
    await sleep(250);
    return {
      payload: Array.from(this.tasks.values()),
      status: 200,
      headers: {},
    };
  }

  async getTaskById({
    taskId,
    ...params
  }: GetTaskByIdParams): Promise<HttpClientResponse<Task | undefined>> {
    await sleep(250);
    return {
      payload: this.tasks.get(taskId),
      status: 200,
      headers: {},
    };
  }
}

export const TASKS_API_SERVICE =
  createToken<TasksApiService>('TasksApiService');

@Module({
  imports: [HttpClientModule],
  providers: [
    provide({
      provide: TASKS_API_SERVICE,
      useFactory: ({ httpClient }) => new TasksApiService(httpClient),
      deps: {
        httpClient: HTTP_CLIENT,
      },
    }),
  ],
})
export class TasksApiModule {}
