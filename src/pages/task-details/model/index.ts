import { getTaskByIdAction } from '@entities/task/model';
import { createAction } from '@tramvai/core';
import { PAGE_SERVICE_TOKEN } from '@tramvai/tokens-router';

export const loadTaskToCurrentRoute = createAction({
  name: 'load task to current route',
  fn: async (context, _, { pageService }) => {
    const { taskId } = pageService.getCurrentRoute().params;
    if (!taskId) {
      return;
    }
    await context.executeAction(getTaskByIdAction, { taskId: Number(taskId) });
  },
  deps: {
    pageService: PAGE_SERVICE_TOKEN,
  },
  conditions: {
    always: true,
  },
});
