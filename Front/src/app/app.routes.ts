import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form';
import { RegisterFormComponent } from './register-form/register-form';
import { PollutionList } from './pollution-list/pollution-list';
import { PollutionDetail } from './pollution-detail/pollution-detail';
import { PollutionForm } from './pollution-form/pollution-form';
import { UserList } from './user-list/user-list';

export const routes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'pollutions', component: PollutionList },
    { path: 'pollutions/new', component: PollutionForm },
    { path: 'pollutions/:id/edit', component: PollutionForm },
    { path: 'pollutions/:id', component: PollutionDetail },
    { path: 'users', component: UserList },
    { path: '', redirectTo: '/pollutions', pathMatch: 'full' },
    { path: '**', redirectTo: '/pollutions' }
];
