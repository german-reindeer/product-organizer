import { TestBed } from '@angular/core/testing';

import { ProductHttpService } from './product-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductHttpService', () => {
  let service: ProductHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ProductHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
