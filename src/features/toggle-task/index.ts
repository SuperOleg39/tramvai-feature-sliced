import { Module } from '@tramvai/core';
import { TaskEntityModule } from '@entities/task';

@Module({
  imports: [TaskEntityModule],
  providers: [],
})
export class ToggleTaskFeatureModule {}
