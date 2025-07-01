// Vehicle type enum reflecting Postgres type
export enum VehicleType {
  Truck = 'truck',
  Van = 'van',
  Car = 'car',
}

// Vehicle status enum reflecting Postgres type
export enum VehicleStatus {
  Available = 'available',
  OnDelivery = 'on delivery',
  Maintenance = 'maintenance',
  Offline = 'offline',
}

// Vehicle DTO mirroring the vehicles table
export interface Vehicle {
  id: number;
  type: VehicleType;
  license_plate: string;
  status: VehicleStatus;
  last_maintenance_date: string | null; // ISO date string or null
} 