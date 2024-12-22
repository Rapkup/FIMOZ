import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { AgranomPageComponent } from './Components/agranom-page/agranom-page.component';
import { ZavMolFermiComponent } from './Components/zav-mol-fermi/zav-mol-fermi.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Главная страница
  { path: 'agranom-page', component: AgranomPageComponent }, // Главная страница
  { path: 'zav-mol-fermi-page', component: ZavMolFermiComponent }, // Главная страница
];
