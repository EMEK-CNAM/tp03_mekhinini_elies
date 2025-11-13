import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login-form.html',
    styleUrls: ['./login-form.css']
})
export class LoginFormComponent {
    constructor(private router: Router) { }

    onSubmit(): void {
        // Login logic here
        localStorage.setItem('app:isLoggedIn', 'true');
        localStorage.setItem('app:username', 'user');
        this.router.navigate(['/pollutions']);
    }

    onRegister(): void {
        this.router.navigate(['/register']);
    }
}
