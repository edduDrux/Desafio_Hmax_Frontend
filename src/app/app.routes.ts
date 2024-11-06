import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'produtos', component: ProductListPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: '', redirectTo: '/produtos', pathMatch: 'full' }   
];