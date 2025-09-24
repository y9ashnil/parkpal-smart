import { ParkingSlot } from '@/types/parking';
import { Car, Clock, Lock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ParkingSlotCardProps {
  slot: ParkingSlot;
  onSelect?: (slot: ParkingSlot) => void;
  isSelectable?: boolean;
}

export function ParkingSlotCard({ slot, onSelect, isSelectable = true }: ParkingSlotCardProps) {
  const statusConfig = {
    available: {
      bgClass: 'bg-parking-available/10 hover:bg-parking-available/20 border-parking-available/30',
      textClass: 'text-parking-available',
      icon: Car,
      label: 'Available',
    },
    occupied: {
      bgClass: 'bg-parking-occupied/10 border-parking-occupied/30',
      textClass: 'text-parking-occupied',
      icon: Lock,
      label: 'Occupied',
    },
    reserved: {
      bgClass: 'bg-parking-reserved/10 border-parking-reserved/30',
      textClass: 'text-parking-reserved',
      icon: Clock,
      label: 'Reserved',
    },
    disabled: {
      bgClass: 'bg-parking-disabled/10 border-parking-disabled/30',
      textClass: 'text-parking-disabled',
      icon: XCircle,
      label: 'Disabled',
    },
  };

  const config = statusConfig[slot.status];
  const Icon = config.icon;
  const isClickable = isSelectable && slot.status === 'available';

  return (
    <div
      onClick={() => isClickable && onSelect?.(slot)}
      className={cn(
        'relative p-4 rounded-lg border-2 transition-all duration-200',
        config.bgClass,
        isClickable && 'cursor-pointer hover:scale-105 hover:shadow-lg'
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-lg text-foreground">{slot.slotNumber}</span>
        <Icon className={cn('w-5 h-5', config.textClass)} />
      </div>
      
      <div className="space-y-1">
        <div className={cn('text-sm font-medium', config.textClass)}>
          {config.label}
        </div>
        
        {slot.vehicleNumber && (
          <div className="text-xs text-muted-foreground">
            Vehicle: {slot.vehicleNumber}
          </div>
        )}
        
        {slot.reservedUntil && (
          <div className="text-xs text-muted-foreground">
            Until: {new Date(slot.reservedUntil).toLocaleTimeString()}
          </div>
        )}
      </div>
      
      {slot.status === 'available' && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-parking-available/5 to-transparent pointer-events-none" />
      )}
    </div>
  );
}