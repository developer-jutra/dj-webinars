import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonnelDTO } from './personnel.model';

@Injectable({
  providedIn: 'root'
})
export class PersonnelHttpService {
  private http = inject(HttpClient);
  
  private apiUrl = (globalThis as any)?.['API_URL'] || 'http://localhost:3000';

  getPersonnel(): Observable<PersonnelDTO[]> {
    return this.http.get<PersonnelDTO[]>(`${this.apiUrl}/employees`);
  }

  addPersonnel(personnel: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employees`, personnel);
  }
}
