import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private routerService: Router) { }

  toDashboard() {
    console.log("Check 3 in RouterService");

    this.routerService.navigate(["/dashboard"]);
  }

  toLogin() {
    this.routerService.navigate(["/login"]);
  }
}
