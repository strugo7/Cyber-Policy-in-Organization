'use client';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  color?: 'primary' | 'secondary' | 'danger';
}

export default function ProgressBar({
  value,
  max,
  className = '',
  color = 'primary',
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    danger: 'bg-danger',
  };

  const glowClasses = {
    primary: 'shadow-[0_0_10px_rgba(61,214,245,0.5)]',
    secondary: 'shadow-[0_0_10px_rgba(127,19,236,0.5)]',
    danger: 'shadow-[0_0_10px_rgba(242,13,13,0.5)]',
  };

  return (
    <div className={`w-full bg-white/5 rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${colorClasses[color]} ${glowClasses[color]}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
