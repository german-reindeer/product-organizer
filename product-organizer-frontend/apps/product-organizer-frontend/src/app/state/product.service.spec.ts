import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductHttpService } from './product-http.service';
import { Product } from '../model/product';
import { cold } from 'jest-marbles';
import { ProductQuery } from './product.query';
import { ProductStore } from './product.store';

describe('ProductService', () => {
  let service: ProductService;
  let productHttpServiceMock;
  let productQuery: ProductQuery;
  let productStore: ProductStore;

  beforeEach(() => {
    productHttpServiceMock = {
      getProducts: jest.fn(),
      postProduct: jest.fn(),
      putProduct: jest.fn(),
    };
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ProductHttpService,
          useValue: productHttpServiceMock,
        },
      ],
    });
    service = TestBed.inject(ProductService);
    productQuery = TestBed.inject(ProductQuery);
    productStore = TestBed.inject(ProductStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchAll should add all products to ', () => {
    // arrange
    const products = [createProductMock(1), createProductMock(2)];
    const products$ = cold('--a', {
      a: products,
    });
    productHttpServiceMock.getProducts.mockReturnValue(products$);

    // act
    service.fetchAll();

    // assert
    expect(productHttpServiceMock.getProducts).toHaveBeenCalledTimes(1);
    expect(products$).toSatisfyOnFlush(() => {
      expect(productQuery.getAll()).toEqual(products);
    });
  });

  it('createProduct should add product to store', () => {
    // arrange
    const product = createProductMock(1);
    const product$ = cold('--a', {
      a: product,
    });
    productHttpServiceMock.postProduct.mockReturnValue(product$);

    // act
    service.createProduct(product, () => {});

    // assert
    expect(productHttpServiceMock.postProduct).toHaveBeenCalledTimes(1);
    expect(product$).toSatisfyOnFlush(() => {
      expect(productQuery.getAll()).toEqual([product]);
    });
  });

  it('updateProduct should add product to store', () => {
    // arrange
    const product = createProductMock(1);
    const updatedProduct = { ...product, name: 'New name' };
    const updateProduct$ = cold('--a', {
      a: updatedProduct,
    });
    productStore.add(product);
    productHttpServiceMock.putProduct.mockReturnValue(updateProduct$);

    // act
    service.updateProduct(updatedProduct, () => {});

    // assert
    expect(productHttpServiceMock.putProduct).toHaveBeenCalledWith(updatedProduct);
    expect(updateProduct$).toSatisfyOnFlush(() => {
      expect(productQuery.getAll()).toEqual([updatedProduct]);
    });
  });

  function createProductMock(id: number): Product {
    return {
      id,
      name: 'Something',
    } as Product;
  }
});
