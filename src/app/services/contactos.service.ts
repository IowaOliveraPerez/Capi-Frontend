import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = `${environment.apiUrl}/contactos`;

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getContactById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createContact(contact: any): Observable<any> {
    return this.http.post(this.apiUrl, contact);
  }

  updateContact(id: any, contact: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contact);
  }
}
