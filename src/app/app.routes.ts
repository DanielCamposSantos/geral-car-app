import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Vehicle } from './pages/vehicle/vehicle';

export const routes: Routes = [
    {path:"",component:LandingPage},
    {path:"detalhes/:id",component:Vehicle}
];
