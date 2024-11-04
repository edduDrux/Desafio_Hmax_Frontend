import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomePageComponent },               
  { path: 'login', component: LoginPageComponent },         
  { path: 'register', component: RegisterPageComponent },   
  { path: 'products', component: ProductListPageComponent },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] }, 
  { path: '**', redirectTo: '' }                            
];