import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { LandingPage } from '@/components/LandingPage';
import { StudentDashboard } from '@/components/StudentDashboard';
import { AdminDashboard } from '@/components/AdminDashboard';
import { mockParkingSlots, calculateStats } from '@/data/mockData';
import { ParkingSlot } from '@/types/parking';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>(mockParkingSlots);
  const { toast } = useToast();

  const stats = calculateStats(parkingSlots);

  const handleRoleChange = (role: 'student' | 'admin') => {
    setUserRole(role);
    toast({
      title: `Welcome to ${role === 'admin' ? 'Admin' : 'Student'} Portal`,
      description: `You are now logged in as ${role}.`,
    });
  };

  const handleLogout = () => {
    setUserRole(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleBookSlot = (slotId: string, vehicleNumber: string, duration: number) => {
    setParkingSlots(prev => prev.map(slot => {
      if (slot.id === slotId) {
        return {
          ...slot,
          status: 'reserved' as const,
          vehicleNumber,
          reservedBy: 'current.user@university.edu',
          reservedUntil: new Date(Date.now() + duration * 60 * 60 * 1000),
          updatedAt: new Date(),
        };
      }
      return slot;
    }));
  };

  const handleUpdateSlot = (slotId: string, status: ParkingSlot['status']) => {
    setParkingSlots(prev => prev.map(slot => {
      if (slot.id === slotId) {
        return {
          ...slot,
          status,
          vehicleNumber: status === 'available' ? undefined : slot.vehicleNumber,
          reservedBy: status === 'available' ? undefined : slot.reservedBy,
          reservedUntil: status === 'available' ? undefined : slot.reservedUntil,
          updatedAt: new Date(),
        };
      }
      return slot;
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        userRole={userRole} 
        onRoleChange={handleRoleChange}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {!userRole && (
          <LandingPage onLogin={handleRoleChange} />
        )}
        
        {userRole === 'student' && (
          <StudentDashboard 
            slots={parkingSlots}
            stats={stats}
            onBookSlot={handleBookSlot}
          />
        )}
        
        {userRole === 'admin' && (
          <AdminDashboard 
            slots={parkingSlots}
            stats={stats}
            onUpdateSlot={handleUpdateSlot}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
