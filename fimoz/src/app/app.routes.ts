import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { AgranomPageComponent } from './Components/agranom-page/agranom-page.component';
import { ZavMolFermiComponent } from './Components/zav-mol-fermi/zav-mol-fermi.component';
import { BrigadirComponent } from './Components/brigadir/brigadir.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, // Главная страница
  { path: 'agranom-page', component: AgranomPageComponent }, // Главная страница
  { path: 'zav-mol-fermi-page', component: ZavMolFermiComponent }, // Главная страница
  { path: 'brigadir-page', component: BrigadirComponent }, 
];
