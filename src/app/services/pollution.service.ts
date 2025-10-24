import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, delay, switchMap } from 'rxjs/operators';
import { Pollution } from '../models/pollution';
import { data } from '../../../data';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PollutionService {
    private dataPollution: Pollution[] = (data as any).pollutions as Pollution[] || [];

    constructor(private http: HttpClient) { }

    getAll(): Observable<Pollution[]> {
        return of(this.dataPollution);
    }

    getById(id: string): Observable<Pollution> {
        console.log('Fetching pollution with id:', id);
        const pollution = this.dataPollution.find(p => p.id === id);
        if (!pollution) {
            return throwError(() => new Error('Pollution not found'));
        }

        return of(pollution);
    }

    create(p: Pollution): Observable<Pollution> {
        const newPollution: Pollution = { ...p, id: String((Math.random() * 100).toFixed(0)) };
        this.dataPollution.push(newPollution);
        return of(newPollution);

    }

    update(id: string, p: Pollution): Observable<Pollution> {
        const index = this.dataPollution.findIndex(p => p.id === id);
        if (index === -1) {
            return throwError(() => new Error('Pollution not found'));
        }

        const updatedPollution = { ...this.dataPollution[index], ...p };
        this.dataPollution[index] = updatedPollution;
        return of(updatedPollution);
    }

    delete(id: string): Observable<void> {
        const index = this.dataPollution.findIndex(p => p.id === id);
        if (index === -1) {
            return throwError(() => new Error('Pollution not found'));
        }

        this.dataPollution.splice(index, 1);
        return of(undefined);
    }
}
