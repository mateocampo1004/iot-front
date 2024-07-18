import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IotShopService {
  private url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/products`);
  }

  createProduct<T>(product: T): Observable<T> {
    return this.http.post<T>(`${this.url}/products`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/products/${id}`);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.patch<any>(`${this.url}/products/${id}`, product);
  }
}