import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent) },
    { path: 'register', loadComponent: () => import('./auth/signup/signup.component').then((c) => c.SignupComponent) },
    { path: 'login', loadComponent: () => import('./auth/login/login.component').then((c) => c.LoginComponent) },
    { path: 'profile', loadComponent: () => import('./auth/profile/profile.component').then((c) => c.ProfileComponent), canActivate: [authGuard] },
    { path: 'list-users', loadComponent: () => import('./user/list-user/list-user.component').then((c) => c.ListUserComponent), canActivate: [authGuard] },
    { path: 'update-user', loadComponent: () => import('./user/update-user/update-user.component').then((c) => c.UpdateUserComponent), canActivate: [authGuard] },
    { path: 'update-password', loadComponent: () => import('./user/update-password/update-password.component').then((c) => c.UpdatePasswordComponent), canActivate: [authGuard] },
    { path: 'add-event', loadComponent: () => import('./event/add-event/add-event.component').then((c) => c.AddEventComponent), canActivate: [authGuard] },
    { path: 'update-event', loadComponent: () => import('./event/update-event/update-event.component').then((c) => c.UpdateEventComponent), canActivate: [authGuard] },
    { path: 'list-events', loadComponent: () => import('./event/list-event/list-event.component').then((c) => c.ListEventComponent) },
    { path: 'get-details-event', loadComponent: () => import('./event/get-event-details/get-event-details.component').then((c) => c.GetEventDetailsComponent) },
    { path: 'add-ticket-buying-history', loadComponent: () => import('./ticket-buying-history/add-ticket-buying-history/add-ticket-buying-history.component').then((c) => c.AddTicketBuyingHistoryComponent), canActivate: [authGuard] },
    { path: 'list-ticket-buying-history', loadComponent: () => import('./ticket-buying-history/list-ticket-buying-history/list-ticket-buying-history.component').then((c) => c.ListTicketBuyingHistoryComponent), canActivate: [authGuard] },
    { path: 'buy-ticket', loadComponent: () => import('./buy-ticket/buy-ticket.component').then((c) => c.BuyTicketComponent), canActivate: [authGuard] },
    { path: 'list-ticket-sales', loadComponent: () => import('./ticket-sales/list-ticket-sales/list-ticket-sales.component').then((c) => c.ListTicketSalesComponent), canActivate: [authGuard] },
    { path: '**', redirectTo: 'home' }
];
