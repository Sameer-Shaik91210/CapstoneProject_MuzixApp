import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  navigateToSearch() {
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
  }
}
