export type ParkingSlotStatus = 'available' | 'occupied' | 'reserved' | 'disabled';

export interface ParkingSlot {
  id: string;
  floor: number;
  zone: string;
  slotNumber: string;
  status: ParkingSlotStatus;
  vehicleNumber?: string;
  reservedBy?: string;
  reservedUntil?: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  slotId: string;
  slotNumber: string;
  vehicleNumber: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  vehicleNumber?: string;
}

export interface ParkingStats {
  totalSlots: number;
  availableSlots: number;
  occupiedSlots: number;
  reservedSlots: number;
  utilizationRate: number;
}