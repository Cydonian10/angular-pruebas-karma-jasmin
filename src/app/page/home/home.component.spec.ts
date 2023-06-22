import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ProductComponent } from 'src/app/components/product/product.component';
import { ProductService } from 'src/app/services/product/product.service';
import { generateManyProducts } from 'src/app/models/product.mock';
import { of, defer } from 'rxjs';
import { By } from '@angular/platform-browser';

fdescribe('Home Component', () => {
  let homeComponent: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productSrv: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent, ProductComponent],
      providers: [
        {
          provide: ProductService,
          useValue: spy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    productSrv = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    const productsMock = generateManyProducts(3);
    productSrv.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges(); // ngOnInit
  });

  it('should create', () => {
    const productsMock = generateManyProducts(20);
    productSrv.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges(); //ngOnInit
    expect(HomeComponent).toBeTruthy();
    expect(productSrv.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('should return product list from service', () => {
      //arrange
      const productMock = generateManyProducts(10);
      productSrv.getAll.and.returnValue(of(productMock));
      const countPreve = homeComponent.products.length;
      //act
      homeComponent.getAllProducts();
      fixture.detectChanges();
      //assert
      expect(homeComponent.products.length).toEqual(
        productMock.length + countPreve
      );
    });

    it('should return product list from service with button', fakeAsync(() => {
      //arrange
      const productMock = generateManyProducts(10);
      productSrv.getAll.and.returnValue(of(productMock));
      const countPreve = homeComponent.products.length;
      const btnLoadMoreDebug = fixture.debugElement.query(
        By.css('.btn.btn-primary')
      );
      //act
      //homeComponent.getAllProducts();
      btnLoadMoreDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      //assert
      expect(homeComponent.products.length).toEqual(
        productMock.length + countPreve
      );
    }));

    it("should change the status 'loading => success'", fakeAsync(() => {
      //arrange
      const productMock = generateManyProducts(10);
      productSrv.getAll.and.returnValue(
        defer(() => Promise.resolve(productMock))
      );
      const countPreve = homeComponent.products.length;
      //act
      homeComponent.getAllProducts();
      fixture.detectChanges();

      expect(homeComponent.status).toEqual('loading');
      tick(); //exec, obs, setTeimout, promise
      fixture.detectChanges();
      expect(homeComponent.status).toEqual('success');
      //assert
    }));

    it("should change the status 'loading => error'", fakeAsync(() => {
      //arrange
      const productMock = generateManyProducts(10);
      productSrv.getAll.and.returnValue(defer(() => Promise.reject('Error')));
      //act
      homeComponent.getAllProducts();
      fixture.detectChanges();

      expect(homeComponent.status).toEqual('loading');
      tick(); //exec, obs, setTeimout, promise
      fixture.detectChanges();
      expect(homeComponent.status).toEqual('error');
      //assert
    }));
  });
});
