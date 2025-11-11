import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-register-form',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" novalidate>
            <div>
                <label>Full name</label>
                <input formControlName="fullName" />
                <div *ngIf="f['fullName'].touched && f['fullName'].invalid">Name is required.</div>
            </div>

            <div>
                <label>Email</label>
                <input formControlName="email" type="email" />
                <div *ngIf="f['email'].touched && f['email'].invalid">Valid email is required.</div>
            </div>

            <div>
                <label>Password</label>
                <input formControlName="password" type="password" />
                <div *ngIf="f['password'].touched && f['password'].invalid">Password (min 6 chars) is required.</div>
            </div>

            <div>
                <label>Confirm Password</label>
                <input formControlName="confirmPassword" type="password" />
                <div *ngIf="f['confirmPassword'].touched && registerForm.errors?.['passwordMismatch']">Passwords do not match.</div>
            </div>

            <button type="submit">Register</button>
            <button type="button" (click)="goToLogin()">Back to Login</button>
        </form>
    `
})
export class RegisterFormComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) { }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
    }

    get f() {
        return this.registerForm.controls;
    }

    passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
        const pw = group.get('password')?.value;
        const cpw = group.get('confirmPassword')?.value;
        return pw && cpw && pw !== cpw ? { passwordMismatch: true } : null;
    }

    onSubmit(): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        // TODO: send registration data to server
        console.log('Registration data', this.registerForm.value);

        // After successful registration, navigate to login
        this.router.navigate(['/login']);
    }

    goToLogin(): void {
        this.router.navigate(['/login']);
    }
}