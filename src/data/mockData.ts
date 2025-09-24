import { ParkingSlot, Booking, User, ParkingStats } from '@/types/parking';

// Mock parking slots data
export const mockParkingSlots: ParkingSlot[] = [
  // Floor 1 - Zone A
  { id: '1', floor: 1, zone: 'A', slotNumber: 'A-101', status: 'available', updatedAt: new Date() },
  { id: '2', floor: 1, zone: 'A', slotNumber: 'A-102', status: 'occupied', vehicleNumber: 'ABC-1234', updatedAt: new Date() },
  { id: '3', floor: 1, zone: 'A', slotNumber: 'A-103', status: 'available', updatedAt: new Date() },
  { id: '4', floor: 1, zone: 'A', slotNumber: 'A-104', status: 'reserved', reservedBy: 'john.doe@university.edu', reservedUntil: new Date(Date.now() + 2 * 60 * 60 * 1000), updatedAt: new Date() },
  { id: '5', floor: 1, zone: 'A', slotNumber: 'A-105', status: 'available', updatedAt: new Date() },
  { id: '6', floor: 1, zone: 'A', slotNumber: 'A-106', status: 'occupied', vehicleNumber: 'XYZ-5678', updatedAt: new Date() },
  
  // Floor 1 - Zone B
  { id: '7', floor: 1, zone: 'B', slotNumber: 'B-101', status: 'available', updatedAt: new Date() },
  { id: '8', floor: 1, zone: 'B', slotNumber: 'B-102', status: 'available', updatedAt: new Date() },
  { id: '9', floor: 1, zone: 'B', slotNumber: 'B-103', status: 'occupied', vehicleNumber: 'DEF-9012', updatedAt: new Date() },
  { id: '10', floor: 1, zone: 'B', slotNumber: 'B-104', status: 'disabled', updatedAt: new Date() },
  { id: '11', floor: 1, zone: 'B', slotNumber: 'B-105', status: 'available', updatedAt: new Date() },
  { id: '12', floor: 1, zone: 'B', slotNumber: 'B-106', status: 'reserved', reservedBy: 'jane.smith@university.edu', reservedUntil: new Date(Date.now() + 1 * 60 * 60 * 1000), updatedAt: new Date() },
  
  // Floor 2 - Zone A
  { id: '13', floor: 2, zone: 'A', slotNumber: 'A-201', status: 'available', updatedAt: new Date() },
  { id: '14', floor: 2, zone: 'A', slotNumber: 'A-202', status: 'available', updatedAt: new Date() },
  { id: '15', floor: 2, zone: 'A', slotNumber: 'A-203', status: 'occupied', vehicleNumber: 'GHI-3456', updatedAt: new Date() },
  { id: '16', floor: 2, zone: 'A', slotNumber: 'A-204', status: 'available', updatedAt: new Date() },
  { id: '17', floor: 2, zone: 'A', slotNumber: 'A-205', status: 'occupied', vehicleNumber: 'JKL-7890', updatedAt: new Date() },
  { id: '18', floor: 2, zone: 'A', slotNumber: 'A-206', status: 'available', updatedAt: new Date() },
  
  // Floor 2 - Zone B
  { id: '19', floor: 2, zone: 'B', slotNumber: 'B-201', status: 'available', updatedAt: new Date() },
  { id: '20', floor: 2, zone: 'B', slotNumber: 'B-202', status: 'reserved', reservedBy: 'mike.johnson@university.edu', reservedUntil: new Date(Date.now() + 3 * 60 * 60 * 1000), updatedAt: new Date() },
  { id: '21', floor: 2, zone: 'B', slotNumber: 'B-203', status: 'available', updatedAt: new Date() },
  { id: '22', floor: 2, zone: 'B', slotNumber: 'B-204', status: 'available', updatedAt: new Date() },
  { id: '23', floor: 2, zone: 'B', slotNumber: 'B-205', status: 'occupied', vehicleNumber: 'MNO-1234', updatedAt: new Date() },
  { id: '24', floor: 2, zone: 'B', slotNumber: 'B-206', status: 'available', updatedAt: new Date() },
];

// Mock bookings data
export const mockBookings: Booking[] = [
  {
    id: 'b1',
    studentId: 's1',
    studentName: 'John Doe',
    studentEmail: 'john.doe@university.edu',
    slotId: '4',
    slotNumber: 'A-104',
    vehicleNumber: 'ABC-1234',
    startTime: new Date(),
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: 'b2',
    studentId: 's2',
    studentName: 'Jane Smith',
    studentEmail: 'jane.smith@university.edu',
    slotId: '12',
    slotNumber: 'B-106',
    vehicleNumber: 'XYZ-5678',
    startTime: new Date(),
    endTime: new Date(Date.now() + 1 * 60 * 60 * 1000),
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: 'b3',
    studentId: 's3',
    studentName: 'Mike Johnson',
    studentEmail: 'mike.johnson@university.edu',
    slotId: '20',
    slotNumber: 'B-202',
    vehicleNumber: 'DEF-9012',
    startTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    status: 'completed',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
];

// Mock users
export const mockUsers: User[] = [
  { id: 's1', name: 'John Doe', email: 'john.doe@university.edu', role: 'student', vehicleNumber: 'ABC-1234' },
  { id: 's2', name: 'Jane Smith', email: 'jane.smith@university.edu', role: 'student', vehicleNumber: 'XYZ-5678' },
  { id: 's3', name: 'Mike Johnson', email: 'mike.johnson@university.edu', role: 'student', vehicleNumber: 'DEF-9012' },
  { id: 'a1', name: 'Admin User', email: 'admin@university.edu', role: 'admin' },
];

// Calculate stats
export const calculateStats = (slots: ParkingSlot[]): ParkingStats => {
  const totalSlots = slots.length;
  const availableSlots = slots.filter(s => s.status === 'available').length;
  const occupiedSlots = slots.filter(s => s.status === 'occupied').length;
  const reservedSlots = slots.filter(s => s.status === 'reserved').length;
  const utilizationRate = ((occupiedSlots + reservedSlots) / totalSlots) * 100;

  return {
    totalSlots,
    availableSlots,
    occupiedSlots,
    reservedSlots,
    utilizationRate,
  };
};