import React from 'react';
import type { PropsWithChildren, ReactNode } from 'react';
import cn from 'classnames';
import { Link } from '@tinkoff/router';
import type { Task } from '@shared/api/tasks';
import styles from './style.css';

export type TaskRowProps = PropsWithChildren<{
  data?: Task;
  titleHref?: string;
  before?: ReactNode;
}>;

export const TaskRow = ({ data, before, titleHref }: TaskRowProps) => {
  if (!data) return null;

  const title = titleHref ? (
    <Link url={titleHref}>{data.title}</Link>
  ) : (
    data.title
  );

  return (
    <div className={cn(styles.TaskRow, { [styles.completed]: data.completed })}>
      {before}
      {title}
    </div>
  );
};
