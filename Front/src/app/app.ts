import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  isLoggedIn = false;
  username?: string;
  favoritesCount = 0;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('app:isLoggedIn');
      if (stored !== null) {
        this.isLoggedIn = stored === 'true';
      }
      const user = localStorage.getItem('app:username');
      if (user) {
        this.username = user;
      }
    }

    this.favoritesService.favorites$.subscribe(favorites => {
      this.favoritesCount = favorites.length;
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }

  onLogout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('app:isLoggedIn');
      localStorage.removeItem('app:username');
    }
    this.isLoggedIn = false;
    this.username = undefined;
    this.favoritesService.clearCurrentUser();
    this.router.navigate(['/']);
  }

  onUserList(): void {
    this.router.navigate(['/users']);
  }

  onFavorites(): void {
    this.router.navigate(['/favorites']);
  }
}
