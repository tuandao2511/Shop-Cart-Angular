import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './components/detail/detail/detail.component';
import { HomeComponent } from './components/home/home/home.component';
import { RegisterComponent } from './components/register/register/register.component';
import { LoginComponent } from './components/login/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { OrderComponent } from './components/order/order/order.component';

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
  },
  {
    path: 'profile',
    component: UserEditComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'order',
    component: OrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
