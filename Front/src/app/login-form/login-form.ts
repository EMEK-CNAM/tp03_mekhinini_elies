import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login-form.html',
    styleUrls: ['./login-form.css']
})
export class LoginFormComponent {
    email = '';
    password = '';

    constructor(
        private router: Router,
        private favoritesService: FavoritesService
    ) { }

    onSubmit(): void {
        const username = this.email.split('@')[0];
        localStorage.setItem('app:isLoggedIn', 'true');
        localStorage.setItem('app:username', username);

        this.favoritesService.setCurrentUser(username);

        window.location.href = '/pollutions';
    }

    onRegister(): void {
        this.router.navigate(['/register']);
    }
}
