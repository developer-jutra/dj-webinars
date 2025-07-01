import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetStore } from './fleet-store.service';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule],
  providers: [FleetStore],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 class="text-2xl font-bold">Fleet Management</h1>
        <div class="mt-4 md:mt-0">
          <button class="btn btn-primary">
            <span class="material-icons mr-1">add</span>
            Add Vehicle
          </button>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div class="flex-grow">
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                <span class="material-icons text-base">search</span>
              </span>
              <input 
                type="text" 
                placeholder="Search vehicles..." 
                class="form-control pl-10" />
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <select class="form-control">
              <option>All Types</option>
              <option>Trucks</option>
              <option>Vans</option>
              <option>Cars</option>
            </select>
            <select class="form-control">
              <option>All Statuses</option>
              <option>Available</option>
              <option>On Delivery</option>
              <option>Maintenance</option>
              <option>Offline</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Fleet Table -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-neutral-200">
            <thead class="bg-neutral-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Vehicle ID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Type</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">License Plate</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Current Driver</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Last Maintenance</th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-neutral-200">
              @for (vehicle of vehicles; track vehicle.id) {
                <tr class="hover:bg-neutral-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{{ vehicle.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ vehicle.type }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ vehicle.licensePlate }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span [class]="getStatusClass(vehicle.status)">
                      {{ vehicle.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ vehicle.currentDriver }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ vehicle.lastMaintenance }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-primary-500 hover:text-primary-700 transition-colors mr-2">
                      <span class="material-icons text-base">edit</span>
                    </button>
                    <button class="text-neutral-400 hover:text-neutral-600 transition-colors">
                      <span class="material-icons text-base">more_vert</span>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-3 flex items-center justify-between border-t border-neutral-200">
          <div class="flex-1 flex justify-between sm:hidden">
            <button class="btn btn-secondary">Previous</button>
            <button class="btn btn-secondary ml-3">Next</button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-neutral-700">
                Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">20</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                  <span class="sr-only">Previous</span>
                  <span class="material-icons text-sm">chevron_left</span>
                </button>
                <button class="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50">1</button>
                <button class="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-primary-50 text-sm font-medium text-primary-600 hover:bg-primary-100">2</button>
                <button class="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50">3</button>
                <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                  <span class="sr-only">Next</span>
                  <span class="material-icons text-sm">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FleetComponent {
  store = inject(FleetStore);

  vehicles = [
    {
      id: 'V-001',
      type: 'Truck',
      licensePlate: 'TRK-1234',
      status: 'Available',
      currentDriver: 'None',
      lastMaintenance: '2025-01-10'
    },
    {
      id: 'V-002',
      type: 'Van',
      licensePlate: 'VAN-5678',
      status: 'On Delivery',
      currentDriver: 'John Smith',
      lastMaintenance: '2024-12-15'
    },
    {
      id: 'V-003',
      type: 'Truck',
      licensePlate: 'TRK-9012',
      status: 'Maintenance',
      currentDriver: 'None',
      lastMaintenance: '2025-01-15'
    },
    {
      id: 'V-004',
      type: 'Car',
      licensePlate: 'CAR-3456',
      status: 'On Delivery',
      currentDriver: 'Sarah Johnson',
      lastMaintenance: '2024-12-20'
    },
    {
      id: 'V-005',
      type: 'Van',
      licensePlate: 'VAN-7890',
      status: 'Available',
      currentDriver: 'None',
      lastMaintenance: '2025-01-05'
    },
    {
      id: 'V-006',
      type: 'Truck',
      licensePlate: 'TRK-1357',
      status: 'Offline',
      currentDriver: 'None',
      lastMaintenance: '2024-11-30'
    },
    {
      id: 'V-007',
      type: 'Car',
      licensePlate: 'CAR-2468',
      status: 'On Delivery',
      currentDriver: 'Michael Brown',
      lastMaintenance: '2025-01-02'
    }
  ];

  ngOnInit() {
    // Access state: this.store.vehicles(), this.store.filters(), etc.
    // Update state: this.store.setVehicles([...]), this.store.setFilters({...}), etc.
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    
    switch(status) {
      case 'Available':
        return `${baseClasses} bg-success-50 text-success-500`;
      case 'On Delivery':
        return `${baseClasses} bg-primary-50 text-primary-500`;
      case 'Maintenance':
        return `${baseClasses} bg-warning-50 text-warning-500`;
      case 'Offline':
        return `${baseClasses} bg-neutral-100 text-neutral-500`;
      default:
        return baseClasses;
    }
  }
}