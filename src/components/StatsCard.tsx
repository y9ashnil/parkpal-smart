import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend = 'neutral',
  className 
}: StatsCardProps) {
  const trendColors = {
    up: 'text-parking-available',
    down: 'text-parking-occupied',
    neutral: 'text-muted-foreground',
  };

  return (
    <Card className={cn(
      'p-6 hover:shadow-lg transition-shadow duration-200',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {description && (
            <p className={cn('text-sm', trendColors[trend])}>
              {description}
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-gradient-primary">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </Card>
  );
}