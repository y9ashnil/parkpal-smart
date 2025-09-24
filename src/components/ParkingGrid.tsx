import { useState } from 'react';
import { ParkingSlot } from '@/types/parking';
import { ParkingSlotCard } from './ParkingSlotCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ParkingGridProps {
  slots: ParkingSlot[];
  onSlotSelect?: (slot: ParkingSlot) => void;
  isSelectable?: boolean;
}

export function ParkingGrid({ slots, onSlotSelect, isSelectable = true }: ParkingGridProps) {
  const [selectedFloor, setSelectedFloor] = useState(1);
  
  // Get unique floors
  const floors = [...new Set(slots.map(s => s.floor))].sort();
  
  // Get unique zones for selected floor
  const getZonesForFloor = (floor: number) => {
    return [...new Set(slots.filter(s => s.floor === floor).map(s => s.zone))].sort();
  };
  
  const getSlotsForFloorAndZone = (floor: number, zone: string) => {
    return slots.filter(s => s.floor === floor && s.zone === zone);
  };

  return (
    <div className="w-full">
      <Tabs value={`floor-${selectedFloor}`} onValueChange={(v) => setSelectedFloor(parseInt(v.split('-')[1]))}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          {floors.map(floor => (
            <TabsTrigger key={floor} value={`floor-${floor}`} className="text-base">
              Floor {floor}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {floors.map(floor => (
          <TabsContent key={floor} value={`floor-${floor}`} className="space-y-8">
            {getZonesForFloor(floor).map(zone => (
              <div key={zone} className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-foreground">Zone {zone}</h3>
                  <div className="h-px flex-1 bg-border" />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {getSlotsForFloorAndZone(floor, zone).map(slot => (
                    <ParkingSlotCard
                      key={slot.id}
                      slot={slot}
                      onSelect={onSlotSelect}
                      isSelectable={isSelectable}
                    />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}