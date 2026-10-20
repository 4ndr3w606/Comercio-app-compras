import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ApiService {
private http = inject(HttpClient);
private apiUrl = 'https://api.ejemplo.com/v1/items';
getItems(): Observable<any[]> {
return this.http.get<any[]>(this.apiUrl);
}
createItem(data: any): Observable<any> {
return this.http.post<any>(this.apiUrl, data);
}
}