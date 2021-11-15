import { Module } from '@tramvai/core';
import { ROUTES_TOKEN } from '@tramvai/tokens-router';
import { TaskEntityModule } from '@entities/task';
import { TasksFiltersFeatureModule } from '@features/tasks-filters';
import { ToggleTaskFeatureModule } from '@features/toggle-task';

@Module({
  imports: [
    TaskEntityModule,
    TasksFiltersFeatureModule,
    ToggleTaskFeatureModule,
  ],
  providers: [
    {
      provide: ROUTES_TOKEN,
      multi: true,
      useValue: [
        {
          name: 'main',
          path: '/',
          config: {
            pageComponent: '@/routes/task-list',
          },
        },
      ],
    },
  ],
})
export class TasksListPageModule {}
