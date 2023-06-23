import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { PersonComponent } from './page/person/person.component';
import { OtherComponent } from './page/other/other.component';
import { FormsComponent } from './page/forms/forms.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'person',
    component: PersonComponent,
  },
  {
    path: 'others',
    component: OtherComponent,
  },
  {
    path: 'forms',
    component: FormsComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
