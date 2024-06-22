import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

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
    private router: Router
  ) {
    this.logInForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]], // Added Validators.pattern
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]] // Added Validators.pattern
    });
  }

  onLogin(): void {
    if (this.logInForm.invalid) {
      return;
    }

    const logInUser = this.logInForm.value;
    this.authService.login(logInUser).subscribe({
      next: (data: any) => {
        this.snackBar.open('Login successful !!', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.authService.saveToken(data);
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        this.snackBar.open('Failed to sign in !! Please Try Again Later', 'close', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
        console.error(error);
      }
    });

    this.logInForm.reset();
  }
}
