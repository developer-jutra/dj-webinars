import { Component, EventEmitter, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonnelHttpService } from './personnel-http.service';
import { PersonnelDTO } from './personnel.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-personnel-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Modal Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <!-- Modal Container -->
      <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
          <h2 class="text-xl font-semibold">Add New Personnel</h2>
          <button 
            (click)="onCancel()" 
            class="text-neutral-400 hover:text-neutral-600 transition-colors">
            <span class="material-icons">close</span>
          </button>
        </div>

        <!-- Progress Indicator -->
        <div class="px-6 py-4 bg-neutral-50 border-b border-neutral-200">
          <div class="flex items-center justify-between">
            @for (step of steps; track step.id) {
              <div class="flex flex-col items-center">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-200"
                  [class]="getStepIndicatorClass($index)">
                  @if (currentStep > $index) {
                    <span class="material-icons text-sm">check</span>
                  } @else {
                    {{ $index + 1 }}
                  }
                </div>
                <div class="text-xs mt-1 text-center">{{ step.label }}</div>
              </div>
              @if ($index < steps.length - 1) {
                <div 
                  class="flex-1 h-0.5 mx-2"
                  [class]="currentStep > $index ? 'bg-primary-500' : 'bg-neutral-200'">
                </div>
              }
            }
          </div>
        </div>

        <!-- Modal Body -->
        <div class="px-6 py-6 max-h-[60vh] overflow-y-auto">
          <form [formGroup]="personnelForm">
            @switch (currentStep) {
              @case (0) {
                <div class="animate-fade-in">
                  <h3 class="text-lg font-medium mb-4">Personal Information</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- First Name -->
                    <div class="form-group">
                      <label for="firstName" class="form-label">First Name *</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        formControlName="firstName"
                        class="form-control" 
                        [class.border-error-500]="isFieldInvalid('firstName')" />
                      
                      @if (isFieldInvalid('firstName')) {
                        <p class="mt-1 text-sm text-error-500">First name is required</p>
                      }
                    </div>

                    <!-- Last Name -->
                    <div class="form-group">
                      <label for="lastName" class="form-label">Last Name *</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        formControlName="lastName"
                        class="form-control" 
                        [class.border-error-500]="isFieldInvalid('lastName')" />
                      
                      @if (isFieldInvalid('lastName')) {
                        <p class="mt-1 text-sm text-error-500">Last name is required</p>
                      }
                    </div>

                    <!-- Employee ID -->
                    <div class="form-group">
                      <label for="employeeId" class="form-label">Employee ID *</label>
                      <input 
                        type="text" 
                        id="employeeId" 
                        formControlName="employeeId"
                        class="form-control" 
                        placeholder="EMP-001"
                        [class.border-error-500]="isFieldInvalid('employeeId')" />
                      
                      @if (isFieldInvalid('employeeId')) {
                        <p class="mt-1 text-sm text-error-500">Employee ID is required</p>
                      }
                    </div>

                    <!-- Employee Role -->
                    <div class="form-group">
                      <label for="role" class="form-label">Role *</label>
                      <select 
                        id="role" 
                        formControlName="role"
                        class="form-control" 
                        [class.border-error-500]="isFieldInvalid('role')">
                        <option value="">Select Role</option>
                        <option value="Driver">Driver</option>
                        <option value="Dispatcher">Dispatcher</option>
                        <option value="Manager">Manager</option>
                      </select>
                      
                      @if (isFieldInvalid('role')) {
                        <p class="mt-1 text-sm text-error-500">Role is required</p>
                      }
                    </div>

                    <!-- Date of Birth -->
                    <div class="form-group">
                      <label for="dateOfBirth" class="form-label">Date of Birth</label>
                      <input 
                        type="date" 
                        id="dateOfBirth" 
                        formControlName="dateOfBirth"
                        class="form-control" />
                    </div>

                    <!-- Phone Number -->
                    <div class="form-group">
                      <label for="phoneNumber" class="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phoneNumber" 
                        formControlName="phoneNumber"
                        class="form-control" 
                        placeholder="(555) 123-4567" />
                    </div>

                    <!-- Email -->
                    <div class="form-group">
                      <label for="email" class="form-label">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        formControlName="email"
                        class="form-control" 
                        [class.border-error-500]="isFieldInvalid('email')" />
                      
                      @if (isFieldInvalid('email')) {
                        <p class="mt-1 text-sm text-error-500">Please enter a valid email address</p>
                      }
                    </div>

                    <!-- Driver's License Number -->
                    <div class="form-group">
                      <label for="licenseNumber" class="form-label">Driver's License Number</label>
                      <input 
                        type="text" 
                        id="licenseNumber" 
                        formControlName="licenseNumber"
                        class="form-control" />
                    </div>

                    <!-- License Expiration -->
                    <div class="form-group">
                      <label for="licenseExpiration" class="form-label">License Expiration Date</label>
                      <input 
                        type="date" 
                        id="licenseExpiration" 
                        formControlName="licenseExpiration"
                        class="form-control" />
                    </div>
                  </div>
                </div>
              }
              @case (1) {
                <div class="animate-fade-in">
                  <h3 class="text-lg font-medium mb-4">Address Information</h3>
                  
                  <div class="grid grid-cols-1 gap-4">
                    <!-- Street Address Line 1 -->
                    <div class="form-group">
                      <label for="addressLine1" class="form-label">Street Address Line 1</label>
                      <input 
                        type="text" 
                        id="addressLine1" 
                        formControlName="addressLine1"
                        class="form-control" 
                        placeholder="123 Main Street" />
                    </div>

                    <!-- Street Address Line 2 -->
                    <div class="form-group">
                      <label for="addressLine2" class="form-label">Street Address Line 2 (Optional)</label>
                      <input 
                        type="text" 
                        id="addressLine2" 
                        formControlName="addressLine2"
                        class="form-control" 
                        placeholder="Apt 4B, Suite 200, etc." />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <!-- City -->
                      <div class="form-group">
                        <label for="city" class="form-label">City</label>
                        <input 
                          type="text" 
                          id="city" 
                          formControlName="city"
                          class="form-control" />
                      </div>

                      <!-- State/Province -->
                      <div class="form-group">
                        <label for="state" class="form-label">State/Province</label>
                        <select 
                          id="state" 
                          formControlName="state"
                          class="form-control">
                          <option value="">Select State</option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="IL">Illinois</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                          <!-- Add more states as needed -->
                        </select>
                      </div>

                      <!-- Postal Code -->
                      <div class="form-group">
                        <label for="postalCode" class="form-label">Postal/ZIP Code</label>
                        <input 
                          type="text" 
                          id="postalCode" 
                          formControlName="postalCode"
                          class="form-control" 
                          placeholder="12345" />
                      </div>

                      <!-- Country -->
                      <div class="form-group">
                        <label for="country" class="form-label">Country</label>
                        <select 
                          id="country" 
                          formControlName="country"
                          class="form-control">
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="MX">Mexico</option>
                          <!-- Add more countries as needed -->
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              }
            }
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-neutral-200 flex justify-between">
          <div class="flex space-x-2">
            <button 
              type="button" 
              class="btn btn-secondary"
              (click)="onCancel()">
              Cancel
            </button>
            
            @if (currentStep > 0) {
              <button 
                type="button" 
                class="btn btn-secondary"
                (click)="prevStep()">
                <span class="material-icons mr-1 text-sm">arrow_back</span>
                Previous
              </button>
            }
          </div>

          <div>
            @if (currentStep < steps.length - 1) {
              <button 
                type="button" 
                class="btn btn-primary"
                [disabled]="isCurrentStepInvalid()"
                (click)="nextStep()">
                Next
                <span class="material-icons ml-1 text-sm">arrow_forward</span>
              </button>
            } @else {
              <button 
                type="button" 
                class="btn btn-primary"
                [disabled]="isSubmitting || personnelForm.invalid"
                (click)="onSubmit()">
                @if (isSubmitting) {
                  <span class="mr-2">
                    <span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  </span>
                  Adding...
                } @else {
                  <span class="material-icons mr-1 text-sm">person_add</span>
                  Add Personnel
                }
              </button>
            }
          </div>
        </div>

        <!-- Success Message -->
        @if (showSuccessMessage) {
          <div class="absolute inset-0 bg-white flex items-center justify-center animate-fade-in">
            <div class="text-center">
              <div class="text-success-500 mb-4">
                <span class="material-icons text-6xl">check_circle</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">Personnel Added Successfully!</h3>
              <p class="text-neutral-600 mb-6">{{ personnelForm.get('firstName')?.value }} {{ personnelForm.get('lastName')?.value }} has been added to the system.</p>
              <button 
                class="btn btn-primary"
                (click)="onClose()">
                Close
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class AddPersonnelModalComponent {
  private fb = inject(FormBuilder);
  private personnelHttpService = inject(PersonnelHttpService);
  
  closeModal = output<void>();
  personnelAdded = output<any>();

  steps = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'address', label: 'Address' }
  ];

  currentStep = 0;
  isSubmitting = false;
  showSuccessMessage = false;

  personnelForm: FormGroup = this.fb.group({
    // Personal Information
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    employeeId: ['', Validators.required],
    role: ['', Validators.required],
    dateOfBirth: [''],
    phoneNumber: [''],
    email: ['', Validators.email],
    licenseNumber: [''],
    licenseExpiration: [''],
    
    // Address Information
    addressLine1: [''],
    addressLine2: [''],
    city: [''],
    state: [''],
    postalCode: [''],
    country: ['US']
  });

  getStepIndicatorClass(index: number): string {
    if (this.currentStep > index) {
      return 'bg-primary-500 text-white';
    } else if (this.currentStep === index) {
      return 'bg-primary-500 text-white';
    } else {
      return 'bg-neutral-200 text-neutral-700';
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.personnelForm.get(field);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  isCurrentStepInvalid(): boolean {
    if (this.currentStep === 0) {
      // Step 1: Personal Information - check required fields
      const requiredFields = ['firstName', 'lastName', 'employeeId', 'role'];
      return requiredFields.some(field => {
        const control = this.personnelForm.get(field);
        return control?.invalid;
      }) || this.isFieldInvalid('email');
    }
    
    // Step 2: Address Information - no required fields
    return false;
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1 && !this.isCurrentStepInvalid()) {
      this.currentStep++;
    } else {
      // Mark current step fields as touched to show validation errors
      this.markCurrentStepAsTouched();
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  markCurrentStepAsTouched(): void {
    if (this.currentStep === 0) {
      ['firstName', 'lastName', 'employeeId', 'role', 'email'].forEach(field => {
        this.personnelForm.get(field)?.markAsTouched();
      });
    }
  }

  onSubmit(): void {
    this.markCurrentStepAsTouched();

    if (this.currentStep === this.steps.length - 1 && this.personnelForm.valid) {
      this.isSubmitting = true;
      
      // Send all form data that matches server expectations
      const newPersonnel = {
        employeeId: this.personnelForm.value.employeeId,
        firstName: this.personnelForm.value.firstName,
        lastName: this.personnelForm.value.lastName,
        dateOfBirth: this.personnelForm.value.dateOfBirth,
        phoneNumber: this.personnelForm.value.phoneNumber,
        email: this.personnelForm.value.email,
        role: this.personnelForm.value.role.toLowerCase(), // Server expects lowercase role
        licenseNumber: this.personnelForm.value.licenseNumber,
        licenseExpiration: this.personnelForm.value.licenseExpiration,
        addressLine1: this.personnelForm.value.addressLine1,
        addressLine2: this.personnelForm.value.addressLine2,
        city: this.personnelForm.value.city,
        state: this.personnelForm.value.state,
        postalCode: this.personnelForm.value.postalCode,
      };

      this.personnelHttpService.addPersonnel(newPersonnel).subscribe({
        next: (response: any) => {
          console.log('Personnel added successfully:', response);
          this.personnelAdded.emit(response);
          this.showSuccessMessage = true;
          setTimeout(() => this.onClose(), 2000);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding personnel:', error);
          this.isSubmitting = false;
          // Handle error, e.g., show an error message to the user
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });

    } else {
      this.nextStep();
    }
  }

  onCancel(): void {
    if (this.currentStep > 0) {
      this.prevStep();
    } else {
      this.onClose();
    }
  }

  onClose(): void {
    this.personnelForm.reset();
    this.currentStep = 0;
    this.closeModal.emit();
    this.showSuccessMessage = false;
  }
}