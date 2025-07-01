import { Component, EventEmitter, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

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
                      
                      <!-- Fixed height container for error message -->
                      <div class="h-5 mt-1">
                        @if (isFieldInvalid('firstName')) {
                          <p class="text-sm text-error-500">First name is required</p>
                        }
                      </div>
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
                      
                      <!-- Fixed height container for error message -->
                      <div class="h-5 mt-1">
                        @if (isFieldInvalid('lastName')) {
                          <p class="text-sm text-error-500">Last name is required</p>
                        }
                      </div>
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
                      
                      <!-- Fixed height container for error message -->
                      <div class="h-5 mt-1">
                        @if (isFieldInvalid('employeeId')) {
                          <p class="text-sm text-error-500">Employee ID is required</p>
                        }
                      </div>
                    </div>

                    <!-- Employee Role -->
                    <div class="form-group">
                      <label for="role" class="form-label">Role *</label>
                      <select 
                        id="role" 
                        formControlName="role"
                        class="form-control" 
                        [class.border-error-500]="isFieldInvalid('role')"
                        (change)="onRoleChange()">
                        <option value="">Select Role</option>
                        <option value="Driver">Driver</option>
                        <option value="Dispatcher">Dispatcher</option>
                        <option value="Manager">Manager</option>
                      </select>
                      
                      <!-- Fixed height container for error message -->
                      <div class="h-5 mt-1">
                        @if (isFieldInvalid('role')) {
                          <p class="text-sm text-error-500">Role is required</p>
                        }
                      </div>
                    </div>

                    <!-- Date of Birth -->
                    <div class="form-group">
                      <label for="dateOfBirth" class="form-label">Date of Birth *</label>
                      <input 
                        type="date" 
                        id="dateOfBirth" 
                        formControlName="dateOfBirth"
                        class="form-control"
                        [class.border-error-500]="isFieldInvalid('dateOfBirth')" />
                      
                      <!-- Fixed height container for error message -->
                      <div class="h-5 mt-1">
                        @if (isFieldInvalid('dateOfBirth')) {
                          <p class="text-sm text-error-500">
                            @if (personnelForm.get('dateOfBirth')?.hasError('required')) {
                              Date of birth is required
                            } @else if (personnelForm.get('dateOfBirth')?.hasError('ageRestriction')) {
                              Employee must be at least 18 years old
                            }
                          </p>
                        }
                      </div>
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
                      
                      <!-- Fixed height container (empty for optional fields) -->
                      <div class="h-5 mt-1"></div>
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
                      
                      <!-- Fixed height container for error message -->
                      <div class="h-5 mt-1">
                        @if (isFieldInvalid('email')) {
                          <p class="text-sm text-error-500">Please enter a valid email address</p>
                        }
                      </div>
                    </div>

                    <!-- Driver's License Number (Only for Drivers) -->
                    @if (isDriverRole()) {
                      <div class="form-group">
                        <label for="licenseNumber" class="form-label">Driver's License Number *</label>
                        <input 
                          type="text" 
                          id="licenseNumber" 
                          formControlName="licenseNumber"
                          class="form-control"
                          [class.border-error-500]="isFieldInvalid('licenseNumber')" />
                        
                        <!-- Fixed height container for error message -->
                        <div class="h-5 mt-1">
                          @if (isFieldInvalid('licenseNumber')) {
                            <p class="text-sm text-error-500">Driver's license number is required for drivers</p>
                          }
                        </div>
                      </div>

                      <!-- License Expiration (Only for Drivers) -->
                      <div class="form-group">
                        <label for="licenseExpiration" class="form-label">License Expiration Date *</label>
                        <input 
                          type="date" 
                          id="licenseExpiration" 
                          formControlName="licenseExpiration"
                          class="form-control"
                          [class.border-error-500]="isFieldInvalid('licenseExpiration')" />
                        
                        <!-- Fixed height container for error message -->
                        <div class="h-5 mt-1">
                          @if (isFieldInvalid('licenseExpiration')) {
                            <p class="text-sm text-error-500">License expiration date is required for drivers</p>
                          }
                        </div>
                      </div>
                    }
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
                      
                      <!-- Fixed height container (empty for optional fields) -->
                      <div class="h-5 mt-1"></div>
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
                      
                      <!-- Fixed height container (empty for optional fields) -->
                      <div class="h-5 mt-1"></div>
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
                        
                        <!-- Fixed height container (empty for optional fields) -->
                        <div class="h-5 mt-1"></div>
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
                        
                        <!-- Fixed height container (empty for optional fields) -->
                        <div class="h-5 mt-1"></div>
                      </div>

                      <!-- Country -->
                      <div class="form-group md:col-span-2">
                        <label for="country" class="form-label">Country</label>
                        <select 
                          id="country" 
                          formControlName="country"
                          class="form-control">
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="MX">Mexico</option>
                          <option value="GB">United Kingdom</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="IT">Italy</option>
                          <option value="ES">Spain</option>
                          <option value="NL">Netherlands</option>
                          <option value="BE">Belgium</option>
                          <option value="CH">Switzerland</option>
                          <option value="AT">Austria</option>
                          <option value="SE">Sweden</option>
                          <option value="NO">Norway</option>
                          <option value="DK">Denmark</option>
                          <option value="FI">Finland</option>
                          <option value="PL">Poland</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="SK">Slovakia</option>
                          <option value="HU">Hungary</option>
                          <option value="SI">Slovenia</option>
                          <option value="HR">Croatia</option>
                          <option value="RS">Serbia</option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="ME">Montenegro</option>
                          <option value="MK">North Macedonia</option>
                          <option value="AL">Albania</option>
                          <option value="BG">Bulgaria</option>
                          <option value="RO">Romania</option>
                          <option value="MD">Moldova</option>
                          <option value="UA">Ukraine</option>
                          <option value="BY">Belarus</option>
                          <option value="LT">Lithuania</option>
                          <option value="LV">Latvia</option>
                          <option value="EE">Estonia</option>
                          <option value="RU">Russia</option>
                          <option value="GE">Georgia</option>
                          <option value="AM">Armenia</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="UZ">Uzbekistan</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="TJ">Tajikistan</option>
                          <option value="TM">Turkmenistan</option>
                          <option value="JP">Japan</option>
                          <option value="CN">China</option>
                          <option value="KR">South Korea</option>
                          <option value="IN">India</option>
                          <option value="AU">Australia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="BR">Brazil</option>
                          <option value="AR">Argentina</option>
                          <option value="CL">Chile</option>
                          <option value="PE">Peru</option>
                          <option value="CO">Colombia</option>
                          <option value="VE">Venezuela</option>
                          <option value="UY">Uruguay</option>
                          <option value="PY">Paraguay</option>
                          <option value="BO">Bolivia</option>
                          <option value="EC">Ecuador</option>
                          <option value="GY">Guyana</option>
                          <option value="SR">Suriname</option>
                          <option value="ZA">South Africa</option>
                          <option value="EG">Egypt</option>
                          <option value="MA">Morocco</option>
                          <option value="TN">Tunisia</option>
                          <option value="DZ">Algeria</option>
                          <option value="LY">Libya</option>
                          <option value="SD">Sudan</option>
                          <option value="ET">Ethiopia</option>
                          <option value="KE">Kenya</option>
                          <option value="TZ">Tanzania</option>
                          <option value="UG">Uganda</option>
                          <option value="RW">Rwanda</option>
                          <option value="BI">Burundi</option>
                          <option value="DJ">Djibouti</option>
                          <option value="SO">Somalia</option>
                          <option value="ER">Eritrea</option>
                          <option value="SS">South Sudan</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CM">Cameroon</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="GA">Gabon</option>
                          <option value="CG">Republic of the Congo</option>
                          <option value="CD">Democratic Republic of the Congo</option>
                          <option value="AO">Angola</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
                          <option value="BW">Botswana</option>
                          <option value="NA">Namibia</option>
                          <option value="SZ">Eswatini</option>
                          <option value="LS">Lesotho</option>
                          <option value="MW">Malawi</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MG">Madagascar</option>
                          <option value="MU">Mauritius</option>
                          <option value="SC">Seychelles</option>
                          <option value="KM">Comoros</option>
                        </select>
                        
                        <!-- Fixed height container (empty for optional fields) -->
                        <div class="h-5 mt-1"></div>
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
    dateOfBirth: [this.getDefaultDateOfBirth(), [Validators.required, this.ageValidator]],
    phoneNumber: [''],
    email: ['', Validators.email],
    licenseNumber: [''],
    licenseExpiration: [''],
    
    // Address Information
    addressLine1: [''],
    addressLine2: [''],
    city: [''],
    postalCode: [''],
    country: ['US']
  });

  // Custom validator for age restriction (18+ years)
  ageValidator(control: AbstractControl): {[key: string]: any} | null {
    if (!control.value) {
      return null; // Let required validator handle empty values
    }
    
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred this year
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
      ? age - 1 
      : age;
    
    return actualAge >= 18 ? null : { ageRestriction: true };
  }

  getDefaultDateOfBirth(): string {
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return eighteenYearsAgo.toISOString().split('T')[0];
  }

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

  isDriverRole(): boolean {
    return this.personnelForm.get('role')?.value === 'Driver';
  }

  onRoleChange(): void {
    const role = this.personnelForm.get('role')?.value;
    const licenseNumberControl = this.personnelForm.get('licenseNumber');
    const licenseExpirationControl = this.personnelForm.get('licenseExpiration');

    if (role === 'Driver') {
      // Add required validators for driver license fields
      licenseNumberControl?.setValidators([Validators.required]);
      licenseExpirationControl?.setValidators([Validators.required]);
    } else {
      // Remove validators and clear values for non-driver roles
      licenseNumberControl?.clearValidators();
      licenseExpirationControl?.clearValidators();
      licenseNumberControl?.setValue('');
      licenseExpirationControl?.setValue('');
    }

    // Update validity
    licenseNumberControl?.updateValueAndValidity();
    licenseExpirationControl?.updateValueAndValidity();
  }

  isCurrentStepInvalid(): boolean {
    if (this.currentStep === 0) {
      // Step 1: Personal Information - check required fields
      const requiredFields = ['firstName', 'lastName', 'employeeId', 'role', 'dateOfBirth'];
      
      // Add driver license fields if role is Driver
      if (this.isDriverRole()) {
        requiredFields.push('licenseNumber', 'licenseExpiration');
      }
      
      const hasInvalidRequiredFields = requiredFields.some(field => {
        const control = this.personnelForm.get(field);
        return control?.invalid;
      });
      
      // Also check email validation if provided
      const emailControl = this.personnelForm.get('email');
      const hasInvalidEmail = emailControl?.value && emailControl?.invalid;
      
      return hasInvalidRequiredFields || hasInvalidEmail;
    }
    
    // Step 2: Address Information - no required fields
    return false;
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      // Always mark current step fields as touched to show validation errors
      this.markCurrentStepAsTouched();
      
      // Only proceed if current step is valid
      if (!this.isCurrentStepInvalid()) {
        this.currentStep++;
      }
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  markCurrentStepAsTouched(): void {
    if (this.currentStep === 0) {
      const fieldsToTouch = ['firstName', 'lastName', 'employeeId', 'role', 'dateOfBirth', 'email'];
      
      // Add driver license fields if role is Driver
      if (this.isDriverRole()) {
        fieldsToTouch.push('licenseNumber', 'licenseExpiration');
      }
      
      fieldsToTouch.forEach(field => {
        this.personnelForm.get(field)?.markAsTouched();
      });
    }
  }

  onSubmit(): void {
    if (this.personnelForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccessMessage = true;
        
        // Emit the new personnel data
        this.personnelAdded.emit(this.personnelForm.value);
      }, 1500);
    } else {
      this.personnelForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.closeModal.emit();
  }

  onClose(): void {
    this.closeModal.emit();
  }
}