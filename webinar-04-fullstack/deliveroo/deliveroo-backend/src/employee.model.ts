export type EmployeeRole = 'Driver' | 'Dispatcher' | 'Manager';
export type EmployeeStatus = 'Active' | 'On Leave' | 'Inactive';

export interface EmployeeDTO {
  id: string;
  employeeIdNumber?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  contactPhoneNumber?: string;
  contactEmail: string;
  employeeRole: EmployeeRole;
  employeeStatus: EmployeeStatus;
  driverLicenseNumber?: string;
  licenseExpirationDate?: string;
  streetAddressLine1?: string;
  streetAddressLine2?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

const dbToDtoRoleMap: Record<string, EmployeeRole> = {
  'driver': 'Driver',
  'dispatcher': 'Dispatcher',
  'manager': 'Manager',
};

const dbToDtoStatusMap: Record<string, EmployeeStatus> = {
  'active': 'Active',
  'on leave': 'On Leave',
  'inactive': 'Inactive',
};

export function mapEmployeeRowToDTO(employee: any): EmployeeDTO {
  return {
    id: employee.id,
    employeeIdNumber: employee.employee_id_number,
    firstName: employee.first_name,
    lastName: employee.last_name,
    dateOfBirth: employee.date_of_birth,
    contactPhoneNumber: employee.contact_phone_number,
    contactEmail: employee.contact_email,
    employeeRole: dbToDtoRoleMap[employee.employee_role] || 'Driver',
    employeeStatus: dbToDtoStatusMap[employee.employee_status] || 'Active',
    driverLicenseNumber: employee.driver_license_number,
    licenseExpirationDate: employee.license_expiration_date,
    streetAddressLine1: employee.street_address_line1,
    streetAddressLine2: employee.street_address_line2,
    city: employee.city,
    stateProvince: employee.state_province,
    postalCode: employee.postal_code,
    createdAt: employee.created_at,
    updatedAt: employee.updated_at
  };
} 