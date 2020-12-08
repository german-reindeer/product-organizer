import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Product } from '../model/product';
import { Injectable } from '@angular/core';

export interface ProductState extends EntityState<Product, number> {}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'product',
  resettable: true,
})
export class ProductStore extends EntityStore<ProductState> {
  constructor() {
    super();
  }
}
