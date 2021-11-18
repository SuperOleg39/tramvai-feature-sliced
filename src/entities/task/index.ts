import { Module, provide } from '@tramvai/core';
import { COMBINE_REDUCERS, CONTEXT_TOKEN } from '@tramvai/tokens-common';
import { TasksApiModule } from '@shared/api/tasks';
import { createToken } from '@tinkoff/dippy';
import { QueryConfigStore, TasksStore, TaskEntityRepository } from './model';

export const TASK_ENTITY_REPOSITORY = createToken<TaskEntityRepository>(
  'TaskEntityRepository'
);

@Module({
  imports: [TasksApiModule],
  providers: [
    {
      provide: COMBINE_REDUCERS,
      multi: true,
      useValue: [TasksStore, QueryConfigStore],
    },
    provide({
      provide: TASK_ENTITY_REPOSITORY,
      useClass: TaskEntityRepository,
      deps: {
        context: CONTEXT_TOKEN,
      },
    }),
  ],
})
export class TaskEntityModule {}
