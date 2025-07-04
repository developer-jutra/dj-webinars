import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPersonnelModalComponent } from './add-personnel-modal.component';
import { PersonnelHttpService } from './personnel-http.service';
import { PersonnelDTO } from './personnel.model';

@Component({
  selector: 'app-personnel',
  standalone: true,
  imports: [CommonModule, AddPersonnelModalComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 class="text-2xl font-bold">Personnel Management</h1>
        <div class="mt-4 md:mt-0">
          <button 
            class="btn btn-primary"
            (click)="showAddPersonnelModal.set(true)">
            <span class="material-icons mr-1">person_add</span>
            Add Personnel
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
                placeholder="Search personnel..." 
                class="form-control pl-10" />
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <select class="form-control">
              <option>All Roles</option>
              <option>Driver</option>
              <option>Dispatcher</option>
              <option>Manager</option>
            </select>
            <select class="form-control">
              <option>All Statuses</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      @if (isLoading()) {
        <div class="bg-white rounded-lg shadow-sm p-8 text-center">
          <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <p class="mt-2 text-neutral-600">Loading personnel...</p>
        </div>
      }

      <!-- Error state -->
      @if (error()) {
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex">
            <span class="material-icons text-red-400 mr-2">error</span>
            <div>
              <h3 class="text-red-800 font-medium">Error loading personnel</h3>
              <p class="text-red-600 mt-1">{{ error() }}</p>
              <button 
                (click)="loadPersonnel()" 
                class="mt-2 text-red-600 hover:text-red-800 underline">
                Try again
              </button>
            </div>
          </div>
        </div>
      }

      <!-- Personnel Table -->
      @if (!isLoading() && !error()) {
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-neutral-200">
              <thead class="bg-neutral-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Employee ID</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Name</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Role</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Contact</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Hire Date</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Current Vehicle</th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-neutral-200">
                @for (person of personnel(); track person.id) {
                  <tr class="hover:bg-neutral-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{{ person.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700">
                          {{ getPersonInitial(person) }}
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-neutral-900">{{ getPersonName(person) }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ person.role }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span [class]="getStatusClass(person.status || 'active')">
                        {{ person.status || 'active' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ person.contact || person.email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ person.hireDate || 'N/A' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{{ person.currentVehicle || 'None' }}</td>
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
                  Showing <span class="font-medium">1</span> to <span class="font-medium">{{ personnel().length }}</span> of <span class="font-medium">{{ personnel().length }}</span> results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                    <span class="sr-only">Previous</span>
                    <span class="material-icons text-sm">chevron_left</span>
                  </button>
                  <button class="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-primary-50 text-sm font-medium text-primary-600 hover:bg-primary-100">1</button>
                  <button class="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50">2</button>
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
      }
    </div>

    <!-- Add Personnel Modal -->
    @if (showAddPersonnelModal()) {
      <app-add-personnel-modal
        (closeModal)="onCloseModal()"
        (personnelAdded)="onPersonnelAdded($event)">
      </app-add-personnel-modal>
    }
  `
})
export class PersonnelComponent implements OnInit {
  private personnelHttpService = inject(PersonnelHttpService);

  // Signals for state management
  personnel = signal<PersonnelDTO[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  showAddPersonnelModal = signal<boolean>(false);

  ngOnInit(): void {
    this.loadPersonnel();
  }

  loadPersonnel(): void {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.personnelHttpService.getPersonnel().subscribe({
      next: (data) => {
        this.personnel.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load personnel. Please try again.');
        this.isLoading.set(false);
        console.error('Error loading personnel:', err);
      }
    });
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    
    switch(status.toLowerCase()) {
      case 'active':
        return `${baseClasses} bg-success-50 text-success-500`;
      case 'on leave':
        return `${baseClasses} bg-warning-50 text-warning-500`;
      case 'inactive':
        return `${baseClasses} bg-neutral-100 text-neutral-500`;
      default:
        return baseClasses;
    }
  }

  getPersonName(person: PersonnelDTO): string {
    return `${person.firstName} ${person.lastName}`;
  }

  getPersonInitial(person: PersonnelDTO): string {
    return person.firstName?.charAt(0)?.toUpperCase() || '?';
  }

  onCloseModal(): void {
    this.showAddPersonnelModal.set(false);
  }

  onPersonnelAdded(personnelData: any): void {
    console.log('New personnel added:', personnelData);
    // Reload personnel data from server to get the latest state
    this.loadPersonnel();
    this.showAddPersonnelModal.set(false);
  }
}