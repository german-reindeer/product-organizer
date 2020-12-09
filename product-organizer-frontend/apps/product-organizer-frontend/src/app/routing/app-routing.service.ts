import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductOrganizerRoute } from './product-organizer-route.enum';

@Injectable({
  providedIn: 'root',
})
export class AppRoutingService implements OnDestroy {
  private currentRoute$: Subject<ProductOrganizerRoute> = new Subject();
  private currentRoute: ProductOrganizerRoute;
  private destroy$ = new Subject();

  constructor(private router: Router) {
    this.init();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  selectCurrentRoute(): Observable<ProductOrganizerRoute> {
    return this.currentRoute$;
  }

  getCurrentRoute(): ProductOrganizerRoute {
    return this.currentRoute;
  }

  private init(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const url = this.router.url;
      if (url.includes(ProductOrganizerRoute.LIST)) {
        this.setCurrentRouter(ProductOrganizerRoute.LIST);
      } else if (url.includes(ProductOrganizerRoute.CREATE)) {
        this.setCurrentRouter(ProductOrganizerRoute.CREATE);
      } else if (url.includes(ProductOrganizerRoute.EDIT)) {
        this.setCurrentRouter(ProductOrganizerRoute.EDIT);
      } else {
        this.setCurrentRouter(ProductOrganizerRoute.UNKNOWN);
      }
    });
  }

  private setCurrentRouter(currentRoute: ProductOrganizerRoute): void {
    this.currentRoute$.next(currentRoute);
    this.currentRoute = currentRoute;
  }
}
