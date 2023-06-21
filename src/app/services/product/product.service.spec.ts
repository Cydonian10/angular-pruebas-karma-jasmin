import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { CreateProductDTO, Product } from 'src/app/models/general.model';
import {
  generateManyProducts,
  generateOneProduct,
} from 'src/app/models/product.mock';
import { HTTP_INTERCEPTORS, HttpStatusCode } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptor/token.interceptor';
import { TokenService } from '../token/token.service';

describe('ProductService', () => {
  const apiUrl = 'https://api.escuelajs.co/api/v1';
  let prductSrv: ProductService;
  let httpController: HttpTestingController;
  let tokenSrv: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });
    httpController = TestBed.inject(HttpTestingController);
    prductSrv = TestBed.inject(ProductService);
    tokenSrv = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(prductSrv).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should return product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(20);
      spyOn(tokenSrv, 'getToken').and.returnValue('123');

      prductSrv.getAllSimple().subscribe({
        next: (products) => {
          expect(products.length).toEqual(mockData.length);
          doneFn();
        },
      });
      //http config
      const url = apiUrl + '/products';
      const req = httpController.expectOne(url);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 123');
      req.flush(mockData);
      httpController.verify();
    });

    it('should return product list with taxes', (doneFn) => {
      const mockData: Product[] = [
        { ...generateOneProduct(), price: 100 },
        { ...generateOneProduct(), price: 200 },
        { ...generateOneProduct(), price: -200 },
        { ...generateOneProduct(), price: 0 },
      ];

      prductSrv.getAll().subscribe({
        next: (products) => {
          expect(products.length).toEqual(mockData.length);
          expect(products[0].taxes).toEqual(19);
          expect(products[1].taxes).toEqual(38);
          expect(products[2].taxes).toEqual(0);
          expect(products[3].taxes).toEqual(0);
          doneFn();
        },
      });
      //http config
      const url = apiUrl + '/products';
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });

    it('should and query params with limit 10 and offset 3', (doneFn) => {
      const mockData: Product[] = generateManyProducts(10);
      const limit = 10;
      const offset = 3;

      prductSrv.getAll(limit, offset).subscribe({
        next: (data) => {
          expect(data.length).toEqual(mockData.length);
          doneFn();
        },
      });

      //http config
      const url =
        apiUrl + '/products' + '?limit=' + limit + '&offset=' + offset;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      httpController.verify();
    });
  });

  describe('get one product', () => {
    it('should return the right msg when the status code is 404', (doneFn) => {
      const prodcutId = '1';
      const msgError = '404 message';
      const mokcError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError,
      };

      prductSrv.getOne(prodcutId).subscribe({
        error: (error) => {
          expect(error).toEqual('El producto no existe');
          doneFn();
        },
      });

      //http config
      const url = apiUrl + '/products/' + prodcutId;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mokcError);
      httpController.verify();
    });
  });

  describe('test for create', () => {
    it('should return a new Product', (doneFn) => {
      const mockData = generateOneProduct();

      const dto: CreateProductDTO = {
        categoryId: 1,
        title: 'new Product',
        price: 12,
        images: ['url'],
        description: 'bla bla bla',
      };

      prductSrv.create({ ...dto }).subscribe({
        next: (data) => {
          expect(data).toEqual(mockData);
          doneFn();
        },
      });

      //http config
      const url = apiUrl + '/products';
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      httpController.verify();
    });
  });
});
