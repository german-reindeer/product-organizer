import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../model/product';
import { ProductQuery } from '../../state/product.query';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  displayedColumns: string[] = ['edit', 'title', 'name', 'description'];
  products$: Observable<Product[]>;

  constructor(productQuery: ProductQuery) {
    this.products$ = productQuery.selectAll();
  }
}
