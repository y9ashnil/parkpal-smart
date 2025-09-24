import { useState } from 'react';
import { ParkingSlot } from '@/types/parking';
import { ParkingGrid } from './ParkingGrid';
import { BookingModal } from './BookingModal';
import { StatsCard } from './StatsCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Clock, MapPin, TrendingUp, Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { mockBookings } from '@/data/mockData';

interface StudentDashboardProps {
  slots: ParkingSlot[];
  stats: any;
  onBookSlot: (slotId: string, vehicleNumber: string, duration: number) => void;
}

export function StudentDashboard({ slots, stats, onBookSlot }: StudentDashboardProps) {
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredSlots = slots.filter(slot => 
    slot.slotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slot.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSlotSelect = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirm = (vehicleNumber: string, duration: number) => {
    if (selectedSlot) {
      onBookSlot(selectedSlot.id, vehicleNumber, duration);
      setIsBookingModalOpen(false);
      toast({
        title: "Booking Confirmed!",
        description: `Slot ${selectedSlot.slotNumber} has been reserved for ${duration} hours.`,
      });
    }
  };

  // Get student's active bookings
  const activeBookings = mockBookings.filter(b => b.status === 'active').slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-subtle p-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-2 text-foreground">Find Your Parking Spot</h2>
        <p className="text-muted-foreground">
          Real-time availability across all campus parking zones
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Available Slots"
          value={stats.availableSlots}
          icon={Car}
          description={`${Math.round((stats.availableSlots / stats.totalSlots) * 100)}% available`}
          trend="up"
        />
        <StatsCard
          title="Total Slots"
          value={stats.totalSlots}
          icon={MapPin}
          description="Across 2 floors"
        />
        <StatsCard
          title="Peak Hours"
          value="9-11 AM"
          icon={Clock}
          description="High occupancy"
          trend="neutral"
        />
        <StatsCard
          title="Utilization"
          value={`${Math.round(stats.utilizationRate)}%`}
          icon={TrendingUp}
          description="Current usage"
          trend={stats.utilizationRate > 70 ? 'down' : 'up'}
        />
      </div>

      {/* Active Bookings */}
      {activeBookings.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Your Active Bookings
          </h3>
          <div className="space-y-3">
            {activeBookings.map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded bg-gradient-primary">
                    <Car className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Slot {booking.slotNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      Vehicle: {booking.vehicleNumber}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="default" className="bg-parking-available text-white">
                    Active
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Until {new Date(booking.endTime).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Search Bar */}
      <Card className="p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by slot number or zone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-gradient-primary">
            Search
          </Button>
        </div>
      </Card>

      {/* Parking Grid */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Select a Parking Slot</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Click on any available slot to book it
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-parking-available" />
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-parking-occupied" />
            <span className="text-sm">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-parking-reserved" />
            <span className="text-sm">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-parking-disabled" />
            <span className="text-sm">Disabled</span>
          </div>
        </div>
        
        <ParkingGrid 
          slots={filteredSlots} 
          onSlotSelect={handleSlotSelect}
        />
      </Card>

      {/* Booking Modal */}
      <BookingModal
        slot={selectedSlot}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onConfirm={handleBookingConfirm}
      />
    </div>
  );
}