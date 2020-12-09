import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './components/detail/detail/detail.component';
import { HomeComponent } from './components/home/home/home.component';
import { RegisterComponent } from './components/register/register/register.component';
import { LoginComponent } from './components/login/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/product', 
    pathMatch: 'full'
  },
  {
    path: 'product',
    component: HomeComponent
  },
  {
    path: 'category/:id',
    component: HomeComponent
  },
  {
    path: 'product/:id',
    component: DetailComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
