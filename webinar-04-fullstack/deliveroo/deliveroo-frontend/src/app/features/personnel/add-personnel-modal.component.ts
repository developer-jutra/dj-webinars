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
                          <option value="">Select Country</option>
                          <optgroup label="Europe">
                            <option value="AD">Andorra</option>
                            <option value="AL">Albania</option>
                            <option value="AT">Austria</option>
                            <option value="BA">Bosnia and Herzegovina</option>
                            <option value="BE">Belgium</option>
                            <option value="BG">Bulgaria</option>
                            <option value="BY">Belarus</option>
                            <option value="CH">Switzerland</option>
                            <option value="CZ">Czech Republic</option>
                            <option value="DE">Germany</option>
                            <option value="DK">Denmark</option>
                            <option value="EE">Estonia</option>
                            <option value="ES">Spain</option>
                            <option value="FI">Finland</option>
                            <option value="FR">France</option>
                            <option value="GB">United Kingdom</option>
                            <option value="GR">Greece</option>
                            <option value="HR">Croatia</option>
                            <option value="HU">Hungary</option>
                            <option value="IE">Ireland</option>
                            <option value="IS">Iceland</option>
                            <option value="IT">Italy</option>
                            <option value="LI">Liechtenstein</option>
                            <option value="LT">Lithuania</option>
                            <option value="LU">Luxembourg</option>
                            <option value="LV">Latvia</option>
                            <option value="MC">Monaco</option>
                            <option value="MD">Moldova</option>
                            <option value="ME">Montenegro</option>
                            <option value="MK">North Macedonia</option>
                            <option value="MT">Malta</option>
                            <option value="NL">Netherlands</option>
                            <option value="NO">Norway</option>
                            <option value="PL">Poland</option>
                            <option value="PT">Portugal</option>
                            <option value="RO">Romania</option>
                            <option value="RS">Serbia</option>
                            <option value="RU">Russia</option>
                            <option value="SE">Sweden</option>
                            <option value="SI">Slovenia</option>
                            <option value="SK">Slovakia</option>
                            <option value="SM">San Marino</option>
                            <option value="UA">Ukraine</option>
                            <option value="VA">Vatican City</option>
                          </optgroup>
                          <optgroup label="North America">
                            <option value="AG">Antigua and Barbuda</option>
                            <option value="BS">Bahamas</option>
                            <option value="BB">Barbados</option>
                            <option value="BZ">Belize</option>
                            <option value="CA">Canada</option>
                            <option value="CR">Costa Rica</option>
                            <option value="CU">Cuba</option>
                            <option value="DM">Dominica</option>
                            <option value="DO">Dominican Republic</option>
                            <option value="SV">El Salvador</option>
                            <option value="GD">Grenada</option>
                            <option value="GT">Guatemala</option>
                            <option value="HT">Haiti</option>
                            <option value="HN">Honduras</option>
                            <option value="JM">Jamaica</option>
                            <option value="MX">Mexico</option>
                            <option value="NI">Nicaragua</option>
                            <option value="PA">Panama</option>
                            <option value="KN">Saint Kitts and Nevis</option>
                            <option value="LC">Saint Lucia</option>
                            <option value="VC">Saint Vincent and the Grenadines</option>
                            <option value="TT">Trinidad and Tobago</option>
                            <option value="US">United States</option>
                          </optgroup>
                          <optgroup label="South America">
                            <option value="AR">Argentina</option>
                            <option value="BO">Bolivia</option>
                            <option value="BR">Brazil</option>
                            <option value="CL">Chile</option>
                            <option value="CO">Colombia</option>
                            <option value="EC">Ecuador</option>
                            <option value="FK">Falkland Islands</option>
                            <option value="GF">French Guiana</option>
                            <option value="GY">Guyana</option>
                            <option value="PY">Paraguay</option>
                            <option value="PE">Peru</option>
                            <option value="SR">Suriname</option>
                            <option value="UY">Uruguay</option>
                            <option value="VE">Venezuela</option>
                          </optgroup>
                          <optgroup label="Asia">
                            <option value="AF">Afghanistan</option>
                            <option value="AM">Armenia</option>
                            <option value="AZ">Azerbaijan</option>
                            <option value="BH">Bahrain</option>
                            <option value="BD">Bangladesh</option>
                            <option value="BT">Bhutan</option>
                            <option value="BN">Brunei</option>
                            <option value="KH">Cambodia</option>
                            <option value="CN">China</option>
                            <option value="CY">Cyprus</option>
                            <option value="GE">Georgia</option>
                            <option value="IN">India</option>
                            <option value="ID">Indonesia</option>
                            <option value="IR">Iran</option>
                            <option value="IQ">Iraq</option>
                            <option value="IL">Israel</option>
                            <option value="JP">Japan</option>
                            <option value="JO">Jordan</option>
                            <option value="KZ">Kazakhstan</option>
                            <option value="KW">Kuwait</option>
                            <option value="KG">Kyrgyzstan</option>
                            <option value="LA">Laos</option>
                            <option value="LB">Lebanon</option>
                            <option value="MY">Malaysia</option>
                            <option value="MV">Maldives</option>
                            <option value="MN">Mongolia</option>
                            <option value="MM">Myanmar</option>
                            <option value="NP">Nepal</option>
                            <option value="KP">North Korea</option>
                            <option value="OM">Oman</option>
                            <option value="PK">Pakistan</option>
                            <option value="PS">Palestine</option>
                            <option value="PH">Philippines</option>
                            <option value="QA">Qatar</option>
                            <option value="SA">Saudi Arabia</option>
                            <option value="SG">Singapore</option>
                            <option value="KR">South Korea</option>
                            <option value="LK">Sri Lanka</option>
                            <option value="SY">Syria</option>
                            <option value="TW">Taiwan</option>
                            <option value="TJ">Tajikistan</option>
                            <option value="TH">Thailand</option>
                            <option value="TL">Timor-Leste</option>
                            <option value="TR">Turkey</option>
                            <option value="TM">Turkmenistan</option>
                            <option value="AE">United Arab Emirates</option>
                            <option value="UZ">Uzbekistan</option>
                            <option value="VN">Vietnam</option>
                            <option value="YE">Yemen</option>
                          </optgroup>
                          <optgroup label="Africa">
                            <option value="DZ">Algeria</option>
                            <option value="AO">Angola</option>
                            <option value="BJ">Benin</option>
                            <option value="BW">Botswana</option>
                            <option value="BF">Burkina Faso</option>
                            <option value="BI">Burundi</option>
                            <option value="CV">Cape Verde</option>
                            <option value="CM">Cameroon</option>
                            <option value="CF">Central African Republic</option>
                            <option value="TD">Chad</option>
                            <option value="KM">Comoros</option>
                            <option value="CG">Congo</option>
                            <option value="CD">Democratic Republic of the Congo</option>
                            <option value="DJ">Djibouti</option>
                            <option value="EG">Egypt</option>
                            <option value="GQ">Equatorial Guinea</option>
                            <option value="ER">Eritrea</option>
                            <option value="SZ">Eswatini</option>
                            <option value="ET">Ethiopia</option>
                            <option value="GA">Gabon</option>
                            <option value="GM">Gambia</option>
                            <option value="GH">Ghana</option>
                            <option value="GN">Guinea</option>
                            <option value="GW">Guinea-Bissau</option>
                            <option value="CI">Ivory Coast</option>
                            <option value="KE">Kenya</option>
                            <option value="LS">Lesotho</option>
                            <option value="LR">Liberia</option>
                            <option value="LY">Libya</option>
                            <option value="MG">Madagascar</option>
                            <option value="MW">Malawi</option>
                            <option value="ML">Mali</option>
                            <option value="MR">Mauritania</option>
                            <option value="MU">Mauritius</option>
                            <option value="MA">Morocco</option>
                            <option value="MZ">Mozambique</option>
                            <option value="NA">Namibia</option>
                            <option value="NE">Niger</option>
                            <option value="NG">Nigeria</option>
                            <option value="RW">Rwanda</option>
                            <option value="ST">São Tomé and Príncipe</option>
                            <option value="SN">Senegal</option>
                            <option value="SC">Seychelles</option>
                            <option value="SL">Sierra Leone</option>
                            <option value="SO">Somalia</option>
                            <option value="ZA">South Africa</option>
                            <option value="SS">South Sudan</option>
                            <option value="SD">Sudan</option>
                            <option value="TZ">Tanzania</option>
                            <option value="TG">Togo</option>
                            <option value="TN">Tunisia</option>
                            <option value="UG">Uganda</option>
                            <option value="ZM">Zambia</option>
                            <option value="ZW">Zimbabwe</option>
                          </optgroup>
                          <optgroup label="Oceania">
                            <option value="AU">Australia</option>
                            <option value="FJ">Fiji</option>
                            <option value="KI">Kiribati</option>
                            <option value="MH">Marshall Islands</option>
                            <option value="FM">Micronesia</option>
                            <option value="NR">Nauru</option>
                            <option value="NZ">New Zealand</option>
                            <option value="PW">Palau</option>
                            <option value="PG">Papua New Guinea</option>
                            <option value="WS">Samoa</option>
                            <option value="SB">Solomon Islands</option>
                            <option value="TO">Tonga</option>
                            <option value="TV">Tuvalu</option>
                            <option value="VU">Vanuatu</option>
                          </optgroup>
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
    postalCode: [''],
    country: ['']
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
        postalCode: this.personnelForm.value.postalCode,
        country: this.personnelForm.value.country
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