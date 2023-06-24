import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { DetalleComponent } from './detalle.component';
import { ProductService } from 'src/app/services/product/product.service';
import { Location } from '@angular/common';
import { generateOneProduct } from 'src/app/models/product.mock';
import { getText, mockObservable, asyncError } from 'testing';
import { HttpClientModule } from '@angular/common/http';

describe('Product Detail Component', () => {
  let component: DetalleComponent;
  let fixture: ComponentFixture<DetalleComponent>;
  let productSrv: jasmine.SpyObj<ProductService>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const productSrvSpy = jasmine.createSpyObj('ProductService', ['getOne']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [DetalleComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: ProductService,
          useValue: productSrvSpy,
        },
        {
          provide: Location,
          useValue: locationSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleComponent);
    component = fixture.componentInstance;
    productSrv = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('should create', () => {
    const productId = '1';
    const productMock = { ...generateOneProduct(), id: productId };
    component.id = '1';
    productSrv.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render titleText con el mock que le mandamos', () => {
    const productId = '1';
    const productMock = { ...generateOneProduct(), id: productId };
    component.id = '1';
    productSrv.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges();
    const titleText = getText(fixture, 'title');
    expect(titleText).toContain(productMock.title);
    expect(productSrv.getOne).toHaveBeenCalledWith(productId);
  });

  it('should called go to back without id params', () => {
    const productId = undefined;
    component.id = productId;
    location.back.and.callThrough();
    fixture.detectChanges();
    expect(location.back).toHaveBeenCalled();
  });

  it('should called go to back with id params no exist and thorw Error', fakeAsync(() => {
    const productId = '1000';
    // const productMock = { ...generateOneProduct(), id: productId };
    component.id = productId;
    productSrv.getOne.and.returnValue(asyncError('error'));
    fixture.detectChanges();
    expect(component.status).toEqual('loading');
    tick(); // exec pending task
    location.back.and.callThrough();
    fixture.detectChanges();
    expect(component.status).toEqual('error');
    expect(location.back).toHaveBeenCalled();
  }));

  it('should render query params', () => {
    component.queryType = 'other';

    fixture.detectChanges();
    const typeText = getText(fixture, 'type');
    expect(typeText).toContain(component.queryType);
  });
});
