import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { AgranomPageComponent } from './Components/agranom-page/agranom-page.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Главная страница
  { path: 'agranom-page', component: AgranomPageComponent }, // Главная страница
];
