import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { PersonComponent } from './page/person/person.component';
import { PersonOneComponent } from './components/person-one/person-one.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PersonComponent, PersonOneComponent, ProductComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
