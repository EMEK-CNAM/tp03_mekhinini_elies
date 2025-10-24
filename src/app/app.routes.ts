import { Routes } from '@angular/router';
import { PollutionList } from './pollution-list/pollution-list';
import { PollutionDetail } from './pollution-detail/pollution-detail';
import { PollutionForm } from './pollution-form/pollution-form';
import { data } from '../../data';

export const routes: Routes = [
    { path: '', component: PollutionList },
    { path: 'new', component: PollutionForm },
    { path: 'pollution/:id', component: PollutionDetail },
    { path: '**', redirectTo: '' }
];

export function getPrerenderParams() {
    return [
        {
            route: '/pollution/:id', params: () => {
                // Map the pollution data to an array of objects, one for each route parameter
                return data.pollutions.map(p => ({ id: p.id }));
            }
        }
    ];
}