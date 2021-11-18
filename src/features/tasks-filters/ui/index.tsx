import React, { useState } from 'react';
import { useConsumerContext } from '@tramvai/state';
import type { QueryConfig } from '@entities/task/model';
import { getTasksListQuery } from '@entities/task/model';
import { setQueryConfig } from '@entities/task/model';
import { useQuery } from '@tramvai/react-query';

export type Filter = {
  id: number;
  title: string;
  config: QueryConfig;
};

export const filters: Record<number, Filter> = {
  1: {
    id: 1,
    title: 'All',
    config: {},
  },
  2: {
    id: 2,
    title: 'Opened',
    config: { completed: false },
  },
  3: {
    id: 3,
    title: 'Closed',
    config: { completed: true },
  },
};

export const DEFAULT_FILTER = 1;

export const filtersList = Object.values(filters);

export const getFilterById = (id: number) => filters[id];

type Props = {
  loading: boolean;
  onFilterClick: (p: QueryConfig) => void;
};

const View = ({ loading, onFilterClick }: Props) => {
  const [checked, setChecked] = useState(DEFAULT_FILTER);

  return (
    <ul>
      {filtersList.map(({ title, id }) => (
        <li key={id}>
          <label>
            <input
              name="tasks-filters"
              type="radio"
              disabled={loading}
              checked={id === checked}
              onChange={() => {
                if (loading) {
                  return;
                }
                setChecked(id);
                onFilterClick(getFilterById(id).config);
              }}
            />
            {title}
          </label>
        </li>
      ))}
    </ul>
  );
};

export const TasksFilters = () => {
  const { isLoading } = useQuery(getTasksListQuery, {});
  const context = useConsumerContext();
  const onFilterClick = (params: QueryConfig) =>
    context.dispatch(setQueryConfig(params));

  return <View loading={isLoading} onFilterClick={onFilterClick} />;
};
