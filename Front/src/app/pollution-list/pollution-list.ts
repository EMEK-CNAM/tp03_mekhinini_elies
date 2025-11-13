import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollutionService } from '../services/pollution.service';
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

    constructor(private svc: PollutionService, private router: Router) { }

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

    delete(id?: string) {
        if (!id) return;
        if (!confirm('Supprimer ?')) return;
        this.svc.delete(id).subscribe(() => this.load());
    }

    goToDetail(id: string) {
        this.router.navigate(['/pollutions', id]);
    }

    newForm() {
        this.router.navigate(['/pollutions/new']);
    }
}
