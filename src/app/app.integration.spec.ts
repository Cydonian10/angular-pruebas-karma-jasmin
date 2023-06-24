import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { clickElement, query, queryAllByDirective } from 'testing';

@Component({
  selector: 'app-person',
})
class PersonComponent {}

@Component({
  selector: 'app-other',
})
class OtherComponent {}

@Component({
  selector: 'app-home',
})
class HomeComponent {}

const routes = [
  {
    path: 'person',
    component: PersonComponent,
  },
  {
    path: 'others',
    component: OtherComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

describe('App Integration test', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //AppModule
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        AppComponent,
        PersonComponent,
        OtherComponent,
        HomeComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // providers
    router = TestBed.inject(Router);

    router.initialNavigation();

    tick(); // wait while nav...
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 5 routerLinks', () => {
    /**
     * RouterLinkWithHrf es el router link pero del tening module
     */
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(5);
  });

  /**
   * Navegando entre rutas
   */
  it('should render OthersComponent when clicked', fakeAsync(() => {
    clickElement(fixture, 'others-link', true);

    tick(); // wait while nav...
    fixture.detectChanges(); // ngOnInit - OthersComponent

    expect(router.url).toEqual('/others');
    const element = query(fixture, 'app-other');
    expect(element).not.toBeNull();
  }));
});
