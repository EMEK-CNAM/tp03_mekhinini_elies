import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-form',
    template: `
        <form (ngSubmit)="onSubmit()" class="login-form">
            <div>
                <label for="email">Email</label>
                <input id="email" type="email" [value]="email" (input)="email = $any($event.target).value" name="email" required />
            </div>

            <div>
                <label for="password">Password</label>
                <input id="password" type="password" [value]="password" (input)="password = $any($event.target).value" name="password" required />
            </div>

            <div>
                <button type="submit">Login</button>
                <button type="button" (click)="goToRegister()">Register</button>
            </div>
        </form>
    `
})
export class LoginFormComponent {
    email = '';
    password = '';

    constructor(private router: Router) { }

    onSubmit(): void {
        // TODO: add real authentication logic
        console.log('Login submitted', { email: this.email });
    }

    goToRegister(): void {
        this.router.navigate(['/register']);
    }
}