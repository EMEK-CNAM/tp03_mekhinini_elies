import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollutionService } from '../services/pollution.service';
import { FavoritesService } from '../services/favorites.service';
import { Pollution } from '../models/pollution';
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'app-pollution-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './pollution-list.html',
    styleUrls: ['./pollution-list.css']
})
export class PollutionList implements OnInit {
    pollutions: Pollution[] = [];
    loading = false;
    error: string | null = null;

    constructor(
        private svc: PollutionService,
        private router: Router,
        public favoritesService: FavoritesService
    ) { }

    ngOnInit() {
        this.load();
    }

    load() {
        this.loading = true;
        this.svc.getAll().subscribe({
            next: v => { this.pollutions = v; this.loading = false; },
            error: err => { this.error = 'Erreur chargement'; this.loading = false; }
        });
    }

    delete(id?: string | number) {
        if (!id) return;
        if (!confirm('Supprimer ?')) return;
        this.svc.delete(id).subscribe(() => this.load());
    }

    goToDetail(id: string | number | undefined) {
        if (id) {
            this.router.navigate(['/pollutions', id]);
        }
    }

    newForm() {
        this.router.navigate(['/pollutions/new']);
    }

    toggleFavorite(id?: string | number, event?: Event) {
        if (event) {
            event.stopPropagation();
        }
        this.favoritesService.toggleFavorite(id);
    }

    isFavorite(id?: string | number): boolean {
        return this.favoritesService.isFavorite(id);
    }
}
