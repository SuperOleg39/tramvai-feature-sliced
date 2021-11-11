import { createBundle, Module } from '@tramvai/core';
import { lazy } from '@tramvai/react';
import { ADDITIONAL_BUNDLE_TOKEN } from '@tramvai/module-common';
import { ROUTES_TOKEN } from '@tramvai/tokens-router';
import { TaskEntityModule } from '@entities/task';
import { TasksFiltersFeatureModule } from '@features/tasks-filters';
import { ToggleTaskFeatureModule } from '@features/toggle-task';

export const mainDefault = createBundle({
  name: 'mainDefault',
  components: {
    pageDefault: lazy(() => import('./ui/page')),
  },
});

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
        },
      ],
    },
    {
      provide: ADDITIONAL_BUNDLE_TOKEN,
      multi: true,
      useValue: {
        mainDefault,
      },
    },
  ],
})
export class TasksListPageModule {}
