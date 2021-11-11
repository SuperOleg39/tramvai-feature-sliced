import { Module } from '@tramvai/core';
import { COMBINE_REDUCERS } from '@tramvai/tokens-common';
import { TasksApiModule } from '@shared/api/tasks';
import {
  QueryConfigStore,
  TaskDetailsLoadingStore,
  TasksListLoadingStore,
  TasksStore,
} from './model';

@Module({
  imports: [TasksApiModule],
  providers: [
    {
      provide: COMBINE_REDUCERS,
      multi: true,
      useValue: [
        TasksStore,
        QueryConfigStore,
        TasksListLoadingStore,
        TaskDetailsLoadingStore,
      ],
    },
  ],
})
export class TaskEntityModule {}
