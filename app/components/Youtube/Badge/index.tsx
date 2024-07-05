import { ReactNode } from 'react';

interface BadgeProps {
  children?: ReactNode;
  variant: 'primary' | 'lime' | 'skeleton';
  className?: string;
}

const Badge = ({ children, variant, className = '' }: BadgeProps) => {
  return (
    <span
      className={`rounded-full inline-block px-2 py-1 text-white text-sm
        ${variant === 'primary' ? 'bg-primary' : ''}
        ${variant === 'lime' ? 'bg-limeColor' : ''}
        ${variant === 'skeleton' ? 'w-20 h-6 bg-grayColor-200 animate-pulse' : ''}
      ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
