import { TestBed } from '@angular/core/testing';

import { AppRoutingService } from './app-routing.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductOrganizerRoute } from './product-organizer-route.enum';

describe('AppRoutingService', () => {
  let service: AppRoutingService;
  let routerMock;
  let routerEvents$;

  beforeEach(() => {
    routerEvents$ = new Subject();
    routerMock = {
      url: null,
      events: routerEvents$,
    };
  });

  function createService() {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });
    service = TestBed.inject(AppRoutingService);
  }

  it('should be created', () => {
    createService();
    expect(service).toBeTruthy();
  });

  it('should set currentRoute create', () => {
    // arrange / act
    mockUrlAndCreateService('/create');

    // assert
    expect(service.getCurrentRoute()).toEqual(ProductOrganizerRoute.CREATE);
  });

  it('should set currentRoute edit', () => {
    // arrange / act
    mockUrlAndCreateService('/edit/1');

    // assert
    expect(service.getCurrentRoute()).toEqual(ProductOrganizerRoute.EDIT);
  });

  it('should set currentRoute list', () => {
    // arrange / act
    mockUrlAndCreateService('/list');

    // assert
    expect(service.getCurrentRoute()).toEqual(ProductOrganizerRoute.LIST);
  });

  it('should set currentRoute unknown', () => {
    // arrange / act
    mockUrlAndCreateService('/something');

    // assert
    expect(service.getCurrentRoute()).toEqual(ProductOrganizerRoute.UNKNOWN);
  });

  function mockUrlAndCreateService(route: string): void {
    routerMock.url = route;
    createService();
    routerEvents$.next();
  }
});
