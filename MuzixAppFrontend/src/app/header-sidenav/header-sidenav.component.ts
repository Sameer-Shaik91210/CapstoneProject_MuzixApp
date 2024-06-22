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
export class HeaderSidenavComponent implements OnInit{
  searchQuery: string = '';

  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isLoggedIn: boolean = true;
  currentUserProfile:any='';

  constructor(private authService:AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUserProfile=this.authService.getCurrentUserProfile();
    console.log("The current user profile is :",this.authService.getCurrentUserProfile());

  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToSearch() {
    if (!this.searchQuery.trim()) {
      return;
    }
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
  }

  logout() {
    console.log('User logged out');
    this.isLoggedIn = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
