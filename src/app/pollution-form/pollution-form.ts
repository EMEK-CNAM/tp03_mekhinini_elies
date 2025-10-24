import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PollutionService } from '../services/pollution.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pollution-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './pollution-form.html',
    styleUrls: ['./pollution-form.css']
})
export class PollutionForm {
    pollutionForm: any;

    types = ['Plastique', 'Chimique', 'Dépôt sauvage', 'Eau', 'Air', 'Autre'];

    constructor(private fb: FormBuilder, private svc: PollutionService, private router: Router) {
        this.pollutionForm = this.fb.group({
            titre: ['', Validators.required],
            type: ['', Validators.required],
            description: ['', Validators.required],
            dateObservation: ['', Validators.required],
            lieu: ['', Validators.required],
            latitude: [null, [Validators.required]],
            longitude: [null, [Validators.required]],
            photo: ['']
        });
    }

    submit() {
        if (this.pollutionForm.invalid) {
            this.pollutionForm.markAllAsTouched();
            return;
        }
        const payload: any = this.pollutionForm.value;
        this.svc.create(payload).subscribe({
            next: _ => this.router.navigate(['/']),
            error: err => alert('Erreur lors de la création')
        });
    }
}
