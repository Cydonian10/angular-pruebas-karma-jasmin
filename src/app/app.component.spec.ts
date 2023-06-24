import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RouterLinkDirectiveStub, queryAllByDirective } from 'testing';
import { Component } from '@angular/core';
// import { NO_ERRORS_SCHEMA } from '@angular/core';

/**
 * Mandar con sistituos cuando se tienen comonentes anidados
 */
@Component({
  selector: `app-banner`,
})
class BannerComponentStub {}

describe('App Component', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, RouterLinkDirectiveStub],
      // schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should crete ta app', () => {
    expect(app).toBeTruthy();
  });

  it('should the are 7 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    expect(links.length).toEqual(5);
  });

  it('shoudl thea are 7 routerLinks with match router', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);

    const routerLinks = links.map((link) =>
      link.injector.get(RouterLinkDirectiveStub)
    );

    expect(routerLinks[0].linkParams).toEqual('/');
    expect(routerLinks[1].linkParams).toEqual('/person');
  });
});
