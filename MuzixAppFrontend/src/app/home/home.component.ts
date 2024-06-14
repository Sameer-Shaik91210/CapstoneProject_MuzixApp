import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input()
  loggedIn: boolean = false;
  constructor(private authService: AuthService,
    private routerService: RouterService) {
  }

  logout() {
    this.authService.logout();
    this.loggedIn = this.authService.isLoggedIn;
    this.routerService.toLogin();
  }
  
}
