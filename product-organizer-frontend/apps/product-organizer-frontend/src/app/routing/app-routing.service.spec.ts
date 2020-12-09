import { TestBed } from '@angular/core/testing';

import { AppRoutingService } from './app-routing.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppRoutingService', () => {
  let service: AppRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [RouterTestingModule] });
    service = TestBed.inject(AppRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
