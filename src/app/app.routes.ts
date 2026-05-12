import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Vehicle } from './pages/vehicle/vehicle';
import { Catalog } from './pages/catalog/catalog';
import { AdminVeiculos } from './pages/admin-veiculos/admin-veiculos';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: LandingPage },
    { path: "catalog", component: Catalog },
    { path: "detalhes/:id", component: Vehicle },
    { path: "admin", redirectTo: "admin/veiculos", pathMatch: "full" },
    { path: "admin/veiculos", component: AdminVeiculos  },
];
