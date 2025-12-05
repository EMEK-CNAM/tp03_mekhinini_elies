import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PollutionService } from '../services/pollution.service';
import { Pollution } from '../models/pollution';

@Component({
    selector: 'app-pollution-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './pollution-form.html',
    styleUrls: ['./pollution-form.css']
})
export class PollutionForm implements OnInit {
    pollutionForm!: FormGroup;
    isEditMode = false;
    pollutionId?: string;
    errorMessage: string | null = null;
    successMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private svc: PollutionService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.pollutionForm = this.fb.group({
            titre: ['', Validators.required],
            lieu: ['', Validators.required],
            date_observation: ['', Validators.required],
            type_pollution: ['', Validators.required],
            description: [''],
            latitude: [0, Validators.required],
            longitude: [0, Validators.required],
            photo_url: ['']
        });
    }

    ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.pollutionId = id;
            this.svc.getById(id).subscribe({
                next: (pollution) => {
                    this.pollutionForm.patchValue(pollution);
                },
                error: (err) => console.error('Erreur chargement:', err)
            });
        }
    }

    onSubmit(): void {
        if (this.pollutionForm.invalid) {
            this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
            return;
        }

        this.errorMessage = null;
        this.successMessage = null;

        const pollution: Pollution = this.pollutionForm.value;

        console.log('Données du formulaire:', pollution);

        if (this.isEditMode && this.pollutionId) {
            this.svc.update(this.pollutionId, pollution).subscribe({
                next: (response) => {
                    console.log('Mise à jour réussie:', response);
                    this.successMessage = 'Pollution mise à jour avec succès';
                    setTimeout(() => this.router.navigate(['/pollutions', this.pollutionId]), 1000);
                },
                error: (err) => {
                    console.error('Erreur mise à jour complète:', err);
                    this.errorMessage = 'Erreur lors de la mise à jour: ' + (err.error?.message || err.message || 'Erreur inconnue');
                }
            });
        } else {
            console.log('Création de pollution avec payload:', pollution);
            this.svc.create(pollution).subscribe({
                next: (response) => {
                    console.log('Création réussie:', response);
                    this.successMessage = 'Pollution créée avec succès';
                    setTimeout(() => this.router.navigate(['/pollutions']), 1000);
                },
                error: (err) => {
                    console.error('Erreur création complète:', err);
                    this.errorMessage = 'Erreur lors de la création: ' + (err.error?.message || err.message || 'Erreur inconnue');
                }
            });
        }
    }

    onCancel(): void {
        if (this.isEditMode && this.pollutionId) {
            this.router.navigate(['/pollutions', this.pollutionId]);
        } else {
            this.router.navigate(['/pollutions']);
        }
    }
}
