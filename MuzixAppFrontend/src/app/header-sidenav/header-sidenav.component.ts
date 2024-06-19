import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { MovieService } from '../core/services/movie.service';

@Component({
  selector: 'app-header-sidenav',
  templateUrl: './header-sidenav.component.html',
  styleUrls: ['./header-sidenav.component.css']
})
export class HeaderSidenavComponent {
  searchQuery: string = '';

  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isLoggedIn: boolean = true;

  constructor(private router: Router ,private movieService: MovieService) {
  }
  onLoggedIn($event: any) {
    this.isLoggedIn = !($event instanceof LoginComponent);
  }

  navigateToSearch() {
    if (!this.searchQuery.trim()) {
      return;
    }
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
  }

  logout() {
    // Implement your logout logic here
    console.log('User logged out');
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
