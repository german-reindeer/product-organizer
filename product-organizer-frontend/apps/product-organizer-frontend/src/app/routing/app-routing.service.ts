import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router, RouterEvent, UrlSegment } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
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
      }
      if (url.includes(ProductOrganizerRoute.CREATE)) {
        this.setCurrentRouter(ProductOrganizerRoute.CREATE);
      }
      if (url.includes(ProductOrganizerRoute.EDIT)) {
        this.setCurrentRouter(ProductOrganizerRoute.EDIT);
      }
    });
  }

  private setCurrentRouter(currentRoute: ProductOrganizerRoute): void {
    this.currentRoute$.next(currentRoute);
    this.currentRoute = currentRoute;
  }
}
