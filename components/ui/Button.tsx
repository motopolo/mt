import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
};

export default function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50';
  const styles = {
    primary: 'bg-primary text-white hover:bg-indigo-600 focus-visible:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-amber-600 focus-visible:ring-secondary',
    ghost: 'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:ring-neutral-400'
  } as const;

  return (
    <button className={clsx(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}