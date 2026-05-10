import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Vehicle } from './pages/vehicle/vehicle';
import { Catalog } from './pages/catalog/catalog';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: LandingPage },
    { path: "catalog", component: Catalog },
    { path: "detalhes/:id", component: Vehicle }
];
