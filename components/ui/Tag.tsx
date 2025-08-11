import { ReactNode } from 'react';
import clsx from 'clsx';

type TagProps = {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'neutral';
};

export default function Tag({ children, color = 'neutral' }: TagProps) {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    neutral: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200',
  } as const;

  return (
    <span className={clsx('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', colorMap[color])}>
      {children}
    </span>
  );
}