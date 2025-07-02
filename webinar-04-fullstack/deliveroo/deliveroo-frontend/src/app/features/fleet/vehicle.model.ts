// Vehicle type string literal type reflecting backend type
export type VehicleType = 'truck' | 'van' | 'car';

// Vehicle status string literal type reflecting backend DTO
export type VehicleStatus = 'Available' | 'On Delivery' | 'Maintenance' | 'Offline';

// Vehicle DTO mirroring the updated structure
export interface VehicleDTO {
  id: number;
  type: VehicleType;
  licensePlate: string;
  status: VehicleStatus;
  currentDriver: string;
  lastMaintenance: string;
} 