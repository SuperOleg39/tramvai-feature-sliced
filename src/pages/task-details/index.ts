import { createBundle, Module } from '@tramvai/core';
import { lazy } from '@tramvai/react';
import { ADDITIONAL_BUNDLE_TOKEN } from '@tramvai/module-common';
import { ROUTES_TOKEN } from '@tramvai/tokens-router';
import { TaskEntityModule } from '@entities/task';
import { ToggleTaskFeatureModule } from '@features/toggle-task';

export const taskDetailsBundle = createBundle({
  name: 'taskDetailsBundle',
  components: {
    pageDefault: lazy(() => import('./ui/page')),
  },
});

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
            bundle: 'taskDetailsBundle',
          },
        },
      ],
    },
    {
      provide: ADDITIONAL_BUNDLE_TOKEN,
      multi: true,
      useValue: {
        taskDetailsBundle,
      },
    },
  ],
})
export class TaskDetailsPageModule {}
