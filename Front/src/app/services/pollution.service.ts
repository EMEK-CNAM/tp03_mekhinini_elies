import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, delay, switchMap } from 'rxjs/operators';
import { Pollution } from '../models/pollution';
//import { data } from '../../../data';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PollutionService {
    private apiUrl: string = `https://templateweb-latest-nzzn.onrender.com`;

    constructor(private http: HttpClient) { }



    getAll(): Observable<Pollution[]> {
        return this.http.get<Pollution[]>(this.apiUrl + '/api/pollution');
    }

    getById(id: string): Observable<Pollution> {
        //console.log('Fetching pollution with id:', id);
        return this.http.get<Pollution>(`${this.apiUrl}/api/pollution/${id}`);
    }

    create(p: Pollution): Observable<Pollution> {
        return this.http.post<Pollution>(this.apiUrl + '/api/pollution', p);
    }

    update(id: string, p: Pollution): Observable<Pollution> {
        return this.http.put<Pollution>(`${this.apiUrl}/api/pollution/${id}`, p);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/api/pollution/${id}`);
    }
}
