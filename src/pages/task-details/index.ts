import { Module } from '@tramvai/core';
import { ROUTES_TOKEN } from '@tramvai/tokens-router';
import { TaskEntityModule } from '@entities/task';
import { ToggleTaskFeatureModule } from '@features/toggle-task';

@Module({
  imports: [TaskEntityModule, ToggleTaskFeatureModule],
  providers: [
    {
      provide: ROUTES_TOKEN,
      multi: true,
      useValue: [
        {
          name: 'task',
          path: '/:taskId/',
          config: {
            pageComponent: '@/routes/task-details',
          },
        },
      ],
    },
  ],
})
export class TaskDetailsPageModule {}
