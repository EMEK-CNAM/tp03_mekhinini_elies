import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, delay, switchMap } from 'rxjs/operators';
import { Pollution } from '../models/pollution';
import { environment } from '../../environments/environment';
import { Utilisateur } from '../models/utilisateur';

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
    private apiUrl: string = `https://templateweb-latest-nzzn.onrender.com`;

    constructor(private http: HttpClient) { }



    // getAll(): Observable<Utilisateur[]> {
    //     return this.http.get<Utilisateur[]>(this.apiUrl + '/api/utilisateur');
    // }

    login(username: string, password: string): Observable<Utilisateur> {
        return this.http.post<Utilisateur>(this.apiUrl + '/api/utilisateur/login', { username, password });
    }

    getById(id: string): Observable<Utilisateur> {
        //console.log('Fetching utilisateur with id:', id);
        return this.http.get<Utilisateur>(`${this.apiUrl}/api/utilisateur/${id}`);
    }

    create(p: Utilisateur): Observable<Utilisateur> {
        return this.http.post<Utilisateur>(this.apiUrl + '/api/utilisateur', p);
    }

    // update(id: string, p: Utilisateur): Observable<Utilisateur> {
    //     return this.http.put<Utilisateur>(`${this.apiUrl}/api/utilisateur/${id}`, p);
    // }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/api/utilisateur/${id}`);
    }
}
