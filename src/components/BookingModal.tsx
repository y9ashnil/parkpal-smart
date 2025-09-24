import { useState } from 'react';
import { ParkingSlot } from '@/types/parking';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Car, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  slot: ParkingSlot | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (vehicleNumber: string, duration: number) => void;
}

export function BookingModal({ slot, isOpen, onClose, onConfirm }: BookingModalProps) {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [duration, setDuration] = useState(2);
  const { toast } = useToast();

  const handleBooking = () => {
    if (!vehicleNumber.trim()) {
      toast({
        title: "Vehicle number required",
        description: "Please enter your vehicle number to continue.",
        variant: "destructive",
      });
      return;
    }
    
    onConfirm(vehicleNumber, duration);
    setVehicleNumber('');
    setDuration(2);
  };

  if (!slot) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Parking Slot</DialogTitle>
          <DialogDescription>
            Reserve slot {slot.slotNumber} for your vehicle
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
            <Car className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Selected Slot</p>
              <p className="text-lg font-bold">{slot.slotNumber}</p>
              <p className="text-xs text-muted-foreground">
                Floor {slot.floor}, Zone {slot.zone}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vehicle">Vehicle Number</Label>
            <Input
              id="vehicle"
              placeholder="e.g., ABC-1234"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              className="uppercase"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (hours)</Label>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <Input
                id="duration"
                type="number"
                min="1"
                max="24"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
              />
              <span className="text-sm text-muted-foreground">hours</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-lg bg-parking-available/10 text-parking-available">
            <Calendar className="w-4 h-4" />
            <p className="text-sm">
              Valid until: {new Date(Date.now() + duration * 60 * 60 * 1000).toLocaleString()}
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleBooking} className="bg-gradient-primary">
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}