import { createApp, Scope } from '@tramvai/core';
import { CommonModule } from '@tramvai/module-common';
import { SpaRouterModule } from '@tramvai/module-router';
import { RenderModule } from '@tramvai/module-render';
import { ServerModule, PROXY_CONFIG_TOKEN } from '@tramvai/module-server';
import { ErrorInterceptorModule } from '@tramvai/module-error-interceptor';
import { SeoModule } from '@tramvai/module-seo';
import { ReactQueryModule } from '@tramvai/module-react-query';
import {
  RENDER_SLOTS,
  ResourceType,
  ResourceSlot,
} from '@tramvai/tokens-render';
import { TasksListPageModule } from '@pages/tasks-list';
import { TaskDetailsPageModule } from '@pages/task-details';

createApp({
  name: 'example-app',
  modules: [
    CommonModule,
    SpaRouterModule,
    RenderModule.forRoot({ mode: 'strict' }),
    SeoModule,
    ServerModule,
    ErrorInterceptorModule,
    ReactQueryModule,

    TasksListPageModule,
    TaskDetailsPageModule,
  ],
  providers: [
    // регистрируем meta viewport, который будет добавлятся на каждую страницу
    {
      provide: RENDER_SLOTS,
      multi: true,
      useValue: {
        type: ResourceType.asIs,
        slot: ResourceSlot.HEAD_META,
        payload:
          '<meta name="viewport" content="width=device-width, initial-scale=1">',
      },
    },
    // проксируем статику через /public/ эндпоинт нашего приложения
    {
      provide: PROXY_CONFIG_TOKEN,
      scope: Scope.SINGLETON,
      multi: true,
      useFactory: () => {
        return {
          context: '/public/',
          target: `http://localhost:4000/dist/client/`,
          pathRewrite: (path: string) => {
            return path.replace('/public/', '/');
          },
        };
      },
    },
  ],
});
