import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.productsBackendUrl);
  }

  postProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(environment.productsBackendUrl, product);
  }

  putProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${environment.productsBackendUrl}/${product.id}`, product);
  }
}
