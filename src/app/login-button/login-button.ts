import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-button',
    templateUrl: './login-button.html',
    styleUrls: ['./login-button.css']
})
export class LoginButtonComponent implements OnInit {
    // external binding for current auth state (two-way possible via isLoggedInChange)
    @Input() isLoggedIn = false;
    @Input() username?: string;

    // events for parent components
    @Output() isLoggedInChange = new EventEmitter<boolean>();
    @Output() loginEvent = new EventEmitter<void>();
    @Output() logoutEvent = new EventEmitter<void>();

    constructor(private router: Router) { }

    ngOnInit(): void {
        // optional: sync initial state from localStorage if present
        const stored = localStorage.getItem('app:isLoggedIn');
        if (stored !== null) {
            this.isLoggedIn = stored === 'true';
            this.isLoggedInChange.emit(this.isLoggedIn);
        }
    }

    // called from the template when user clicks the button
    toggleAuth(): void {
        if (this.isLoggedIn) {
            this.performLogout();
        } else {
            this.performLogin();
        }
    }

    performLogin(): void {
        this.isLoggedIn = true;
        localStorage.setItem('app:isLoggedIn', 'true');
        this.isLoggedInChange.emit(this.isLoggedIn);
        this.loginEvent.emit();
        // default navigation after login (adjust route as needed)
        // this.router.navigate(['/dashboard']);
    }

    performLogout(): void {
        this.isLoggedIn = false;
        localStorage.setItem('app:isLoggedIn', 'false');
        this.isLoggedInChange.emit(this.isLoggedIn);
        this.logoutEvent.emit();
        // optionally navigate to home or login page
        // this.router.navigate(['/']);
    }
}