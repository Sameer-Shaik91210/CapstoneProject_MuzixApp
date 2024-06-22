import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RouterService } from '../../core/services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logInForm: FormGroup;
  private emailPattern = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;  // Email regex pattern
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password regex pattern

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private routerService: RouterService
  ) {
    this.logInForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
    });
  }

  onLogin(): void {
    if (this.logInForm.invalid) {
      return;
    }

    const logInUser = this.logInForm.value;
    this.authService.login(logInUser).subscribe({
      next: (data: any) => {
        console.log("Response on successful login: ", data);

        // Assuming the response is a text and needs to be parsed
        const parsedResponse = JSON.parse(data);

        const email = parsedResponse.email;
        const token = parsedResponse.token;

        console.log("Email: ", email);
        console.log("Token: ", token);



        // Fetch user profile
        this.authService.getUserProfileFromAPI(email).subscribe({
          next: (profile: string) => {
            console.log("User Profile: ", profile);
            this.routerService.toHome(); // Adjust navigation as needed
          },
          error: (error: any) => {
            console.error('Failed to fetch user profile', error);
            this.snackBar.open('Failed to fetch user profile', 'close', {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn']
            });
          }
        });

        this.snackBar.open('Login successful !!', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });

        this.logInForm.reset();
      },
      error: (error: any) => {
        this.snackBar.open('Login failed !! Please Try Again Later', 'close', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
        console.error(error);
      }
    });
  }
}
