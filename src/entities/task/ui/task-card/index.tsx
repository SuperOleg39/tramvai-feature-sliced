import React from 'react';
import type { PropsWithChildren } from 'react';
import { Link } from '@tinkoff/router';
import type { Task } from '@shared/api/tasks';
import styles from './style.css';

export type TaskCardProps = PropsWithChildren<{
  data?: Task;
  titleHref?: string;
  loading?: boolean;
  extra?: React.ReactNode;
  action?: React.ReactNode;
}>;

export const TaskCard = ({
  data,
  titleHref,
  children,
  loading,
  extra,
  action,
}: TaskCardProps) => {
  if (!data && !loading) {
    return null;
  }

  return (
    <div className={styles.TaskCard}>
      <div className={styles.TaskCardTitle}>
        <h1>{`Task#${loading ? '...' : data?.id}`}</h1>
        {extra}
      </div>
      <div style={{ height: '400px' }}>
        {!loading &&
          (titleHref ? (
            <Link url={titleHref}>{data?.title}</Link>
          ) : (
            data?.title
          ))}
        {children}
      </div>
      {action}
    </div>
  );
};
