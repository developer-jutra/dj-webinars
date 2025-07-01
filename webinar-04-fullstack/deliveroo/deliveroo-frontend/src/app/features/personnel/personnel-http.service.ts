import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonnelDTO } from './personnel.model';

@Injectable({
  providedIn: 'root'
})
export class PersonnelHttpService {
  private http = inject(HttpClient);
  
  private apiUrl = 'http://localhost:3000'; // Adjust as needed for production

  addPersonnel(personnel: PersonnelDTO): Observable<PersonnelDTO> {
    return this.http.post<PersonnelDTO>(`${this.apiUrl}/employees`, personnel);
  }
}
