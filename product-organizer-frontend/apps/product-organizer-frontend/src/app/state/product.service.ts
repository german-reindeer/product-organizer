import { Injectable } from '@angular/core';
import { ProductStore } from './product.store';
import { ProductHttpService } from './product-http.service';
import { take } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private store: ProductStore, private httpService: ProductHttpService) {}

  fetchAll(): void {
    this.httpService
      .getProducts()
      .pipe(take(1))
      .subscribe((products) => this.store.add(products));
  }

  createProduct(product: Product): void {
    this.httpService
      .postProduct(product)
      .pipe(take(1))
      .subscribe((createdProduct) => this.store.add(createdProduct));
  }

  updateProduct(product: Product): void {
    this.httpService
      .putProduct(product)
      .pipe(take(1))
      .subscribe((createdProduct) => this.store.update(createdProduct));
  }
}
