import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      map(products => products.map(product => this.applyBusinessRules(product))),
      catchError(error => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error('No se pudieron cargar los productos. Intente de nuevo.'));
      })
    );
  }

  private applyBusinessRules(product: Product): Product {
    return {
      ...product,
      inStock: product.price > 0 // Regla de ejemplo
    };
  }
}