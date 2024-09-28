import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = `${environment.apiUrl}/contactos`;

  constructor(private http: HttpClient) { }

  getContacts(page: number, pageSize: number, filter: string, sortColumn:string, sortDirection:string): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString())
      .set('sortColumn', sortColumn)
      .set('sortDirection', sortDirection)
      .set('filter', filter);
    return this.http.get<any>(this.apiUrl, { params });
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

  deleteContact(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
