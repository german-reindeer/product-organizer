import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subject } from 'rxjs';
import { AppRoutingService } from '../../routing/app-routing.service';
import { ActivatedRoute } from '@angular/router';
import { ProductStore } from '../../state/product.store';
import { Product } from '../../model/product';
import { ProductOrganizerRoute } from '../../routing/product-organizer-route.enum';
import { ProductService } from '../../state/product.service';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let appRoutingServiceMock;
  let activatedRouteMock;
  let currentRouteMock$;
  let productServiceMock;
  let productStore: ProductStore;

  beforeEach(async () => {
    currentRouteMock$ = new Subject();
    appRoutingServiceMock = {
      selectCurrentRoute: jest.fn().mockReturnValue(currentRouteMock$),
      getCurrentRoute: jest.fn(),
    };
    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jest.fn(),
        },
      },
    };
    productServiceMock = {
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        {
          provide: ProductService,
          useValue: productServiceMock,
        },
        {
          provide: AppRoutingService,
          useValue: appRoutingServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    productStore = TestBed.inject(ProductStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form if route is EDIT route', () => {
    // arrange
    const product = createProductMock();
    productStore.add(product);
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue(product.id);

    // act
    currentRouteMock$.next(ProductOrganizerRoute.EDIT);

    // assert
    expect(component.productForm.value).toEqual(product);
  });

  it('should not access queryParam if route is CREATE page', () => {
    // act
    currentRouteMock$.next(ProductOrganizerRoute.CREATE);

    // assert
    expect(activatedRouteMock.snapshot.paramMap.get).toHaveBeenCalledTimes(0);
  });

  describe('submit', () => {
    it('should call update for with values from form in EDIT mode', () => {
      // arrange
      appRoutingServiceMock.getCurrentRoute.mockReturnValue(ProductOrganizerRoute.EDIT);
      const product = createProductMock();
      component.productForm.patchValue(product);

      // act
      component.submit();

      // assert
      expect(productServiceMock.updateProduct).toHaveBeenCalledWith(product, expect.any(Function));
    });

    it('should call update for with values from form in CREATE mode', () => {
      // arrange
      appRoutingServiceMock.getCurrentRoute.mockReturnValue(ProductOrganizerRoute.CREATE);
      const product = createProductMock();
      component.productForm.patchValue(product);

      // act
      component.submit();

      // assert
      expect(productServiceMock.createProduct).toHaveBeenCalledWith(product, expect.any(Function));
    });
  });

  function createProductMock(): Product {
    return {
      id: 1,
      name: 'Example name',
      title: 'Example title',
      description: 'Example description',
    };
  }
});
