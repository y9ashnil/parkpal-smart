import { useState } from 'react';
import { ParkingSlot } from '@/types/parking';
import { ParkingGrid } from './ParkingGrid';
import { StatsCard } from './StatsCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Car, TrendingUp, Users, DollarSign, Edit2, RefreshCw, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { mockBookings } from '@/data/mockData';

interface AdminDashboardProps {
  slots: ParkingSlot[];
  stats: any;
  onUpdateSlot: (slotId: string, status: ParkingSlot['status']) => void;
}

export function AdminDashboard({ slots, stats, onUpdateSlot }: AdminDashboardProps) {
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredSlots = slots.filter(slot => 
    slot.slotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slot.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (slot.vehicleNumber && slot.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleStatusUpdate = (slotId: string, newStatus: ParkingSlot['status']) => {
    onUpdateSlot(slotId, newStatus);
    toast({
      title: "Status Updated",
      description: `Slot status has been updated to ${newStatus}.`,
    });
  };

  const handleBulkUpdate = (status: ParkingSlot['status']) => {
    const availableSlots = slots.filter(s => s.status === 'available');
    availableSlots.forEach(slot => {
      onUpdateSlot(slot.id, status);
    });
    toast({
      title: "Bulk Update Complete",
      description: `Updated ${availableSlots.length} slots to ${status}.`,
    });
  };

  // Calculate revenue (mock calculation)
  const dailyRevenue = stats.occupiedSlots * 5 + stats.reservedSlots * 3;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-primary p-6 rounded-xl text-primary-foreground">
        <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
        <p className="opacity-90">
          Manage parking slots and monitor system performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={`$${dailyRevenue}`}
          icon={DollarSign}
          description="Today's earnings"
          trend="up"
        />
        <StatsCard
          title="Occupancy Rate"
          value={`${Math.round(stats.utilizationRate)}%`}
          icon={TrendingUp}
          description={stats.utilizationRate > 70 ? "High demand" : "Normal demand"}
          trend={stats.utilizationRate > 70 ? 'up' : 'neutral'}
        />
        <StatsCard
          title="Active Users"
          value={stats.occupiedSlots + stats.reservedSlots}
          icon={Users}
          description="Current parkers"
        />
        <StatsCard
          title="Available"
          value={stats.availableSlots}
          icon={Car}
          description={`Out of ${stats.totalSlots} total`}
          trend="neutral"
        />
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => handleBulkUpdate('available')}
            className="bg-gradient-success"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset All to Available
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              const randomSlot = slots.find(s => s.status === 'available');
              if (randomSlot) {
                handleStatusUpdate(randomSlot.id, 'occupied');
              }
            }}
          >
            <Car className="w-4 h-4 mr-2" />
            Simulate Parking
          </Button>
          <Button 
            variant="outline"
            onClick={() => toast({ title: "Report Generated", description: "Parking report has been downloaded." })}
          >
            Generate Report
          </Button>
        </div>
      </Card>

      {/* Recent Bookings Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Slot</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBookings.map(booking => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.studentName}</TableCell>
                <TableCell>{booking.slotNumber}</TableCell>
                <TableCell>{booking.vehicleNumber}</TableCell>
                <TableCell>
                  {Math.round((new Date(booking.endTime).getTime() - new Date(booking.startTime).getTime()) / (1000 * 60 * 60))}h
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={booking.status === 'active' ? 'default' : 'secondary'}
                    className={booking.status === 'active' ? 'bg-parking-available text-white' : ''}
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Slot Management */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Slot Management</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Click on any slot to update its status
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search slots, zones, or vehicle numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Selected Slot Editor */}
        {selectedSlot && (
          <div className="mb-6 p-4 rounded-lg bg-secondary">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Edit2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Editing Slot {selectedSlot.slotNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    Floor {selectedSlot.floor}, Zone {selectedSlot.zone}
                  </p>
                </div>
              </div>
              <Select
                value={selectedSlot.status}
                onValueChange={(value: ParkingSlot['status']) => {
                  handleStatusUpdate(selectedSlot.id, value);
                  setSelectedSlot({ ...selectedSlot, status: value });
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Parking Grid */}
        <ParkingGrid 
          slots={filteredSlots} 
          onSlotSelect={setSelectedSlot}
          isSelectable={true}
        />
      </Card>
    </div>
  );
}