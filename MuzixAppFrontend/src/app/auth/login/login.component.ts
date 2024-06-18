// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterService } from '../../core/services/router.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logInForm: FormGroup;
  token: string | undefined;
userId: any;
password: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private routerService: RouterService,
    private snackBar: MatSnackBar
  ){
    this.logInForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  /*isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  onLogin() {
    if (!this.authService.login(this.userId, this.password)) {
      alert('Login failed');
    }else{
      console.log("Check 1 in login");
      this.routerService.toDashboard();
    }
  }*/
    onLogin() {
      let logInUser = this.logInForm.value as Login;
      this.authService.login(logInUser).subscribe({
        next: (data) => {
          this.snackBar.open('Login successful !!', 'success', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          this.authService.saveToken(data.token);
          console.log(data.token);
          this.routerService.toDashboard();// Adjust the navigation route as needed
        },
        error: (error) => {
          this.snackBar.open('Failed to sign in !! Please Try Again Later', 'close', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      });
      this.logInForm.reset();
    }
  }



