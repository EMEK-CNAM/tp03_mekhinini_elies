import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pollution } from '../models/pollution';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PollutionService {
    private base = `${environment.apiUrl}/pollutions`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Pollution[]> {
        return this.http.get<Pollution[]>(this.base);
    }

    getById(id: string): Observable<Pollution> {
        return this.http.get<Pollution>(`${this.base}/${id}`);
    }

    create(p: Pollution): Observable<Pollution> {
        return this.http.post<Pollution>(this.base, p);
    }

    update(id: string, p: Pollution): Observable<Pollution> {
        return this.http.put<Pollution>(`${this.base}/${id}`, p);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.base}/${id}`);
    }
}
