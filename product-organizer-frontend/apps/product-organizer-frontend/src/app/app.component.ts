import { Component } from '@angular/core';
import { AppRoutingService } from './routing/app-routing.service';
import { Observable } from 'rxjs';
import { ProductOrganizerRoute } from './routing/product-organizer-route.enum';
import { ProductService } from './state/product.service';

@Component({
  selector: 'product-organizer-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly ROUTES = ProductOrganizerRoute;
  currentRoute$: Observable<ProductOrganizerRoute>;

  constructor(appRoutingService: AppRoutingService, private productService: ProductService) {
    this.currentRoute$ = appRoutingService.selectCurrentRoute();
    productService.fetchAll();
  }

  refreshList(): void {
    this.productService.fetchAll();
  }
}
