import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-header-sidenav',
  templateUrl: './header-sidenav.component.html',
  styleUrls: ['./header-sidenav.component.css']
})
export class HeaderSidenavComponent implements OnInit {
  searchQuery: string = '';

  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isLoggedIn: boolean = true;
  currentUserProfile: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUserProfile = <string>this.authService.getProfile();
    console.log("The current user profile is :", this.currentUserProfile);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToProfile() {
    this.router.navigate(['/profile']); // Adjust the route as necessary
  }


  navigateToSearch() {
    if (!this.searchQuery.trim()) {
      return;
    }
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    this.searchQuery = '';
    //window.location.reload();
  }

  navigateToFavorites() {
    this.router.navigate(['/favorite-movies'], { queryParams: { isFromNavbar: true } });
  }

  logout() {
    console.log('User logged out');
    this.isLoggedIn = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
