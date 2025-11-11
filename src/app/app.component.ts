import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginButtonComponent } from "./login-button/login-button";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, LoginButtonComponent],
    templateUrl: './app.component.html'
})
export class AppComponent { }
