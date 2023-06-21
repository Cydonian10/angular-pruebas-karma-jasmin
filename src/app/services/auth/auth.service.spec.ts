import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TokenService } from '../token/token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptor/token.interceptor';

describe('AuthService', () => {
  const apiUrl = 'https://api.escuelajs.co/api/v1';
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenSrv: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenSrv = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('test for login', () => {
    it('should save token', (doneFn) => {
      const mockData = { access_token: '121212' };
      const email = 'nico@gamil.com';
      const password = '121212';

      authService.login(email, password).subscribe({
        next: ({ access_token }) => {
          expect(access_token).toEqual(mockData.access_token);
          doneFn();
        },
      });
      //http config
      const url = apiUrl + '/auth/login';
      const req = httpController.expectOne(url);
      const headers = req.request.headers;
      req.flush(mockData);
      httpController.verify();
    });

    it('should return token', (doneFn) => {
      const mockData = { access_token: '121212' };
      const email = 'nico@gamil.com';
      const password = '121212';

      spyOn(tokenSrv, 'saveToken').and.callThrough();

      authService.login(email, password).subscribe({
        next: ({ access_token }) => {
          expect(access_token).toEqual(mockData.access_token);
          expect(tokenSrv.saveToken).toHaveBeenCalledTimes(1);
          expect(tokenSrv.saveToken).toHaveBeenCalledOnceWith('121212');
          doneFn();
        },
      });
      //http config
      const url = apiUrl + '/auth/login';
      const req = httpController.expectOne(url);
      const headers = req.request.headers;
      req.flush(mockData);
      httpController.verify();
    });
  });
});
