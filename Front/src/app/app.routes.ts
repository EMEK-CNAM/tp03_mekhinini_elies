import { Routes } from '@angular/router';
import { PollutionList } from './pollution-list/pollution-list';
import { PollutionDetail } from './pollution-detail/pollution-detail';
import { PollutionForm } from './pollution-form/pollution-form';

export const routes: Routes = [
    { path: '', component: PollutionList },
    { path: 'new', component: PollutionForm },
    { path: 'pollution/:id', component: PollutionDetail },
    { path: '**', redirectTo: '' }
];
