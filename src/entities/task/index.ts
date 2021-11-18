import { Module } from '@tramvai/core';
import { COMBINE_REDUCERS } from '@tramvai/tokens-common';
import { TasksApiModule } from '@shared/api/tasks';
import { QueryConfigStore, TasksStore } from './model';

@Module({
  imports: [TasksApiModule],
  providers: [
    {
      provide: COMBINE_REDUCERS,
      multi: true,
      useValue: [TasksStore, QueryConfigStore],
    },
  ],
})
export class TaskEntityModule {}
