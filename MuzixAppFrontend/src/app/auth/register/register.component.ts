// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { RouterService } from '../../core/services/router.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanComponentDeactivate } from '../../core/guards/can-deactivate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements CanComponentDeactivate { // Implement the interface
  registerForm: FormGroup;
  isRegistered = false;

  private emailPattern = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  private userIdPattern = /^[a-zA-Z0-9]+$/; // Alphanumeric only
  private userNamePattern = /^[a-zA-Z\s]+$/; // Alphabetic and spaces only

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private routerService: RouterService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      userId: ['', [Validators.required, Validators.pattern(this.userIdPattern)]],
      userName: ['', [Validators.required, Validators.pattern(this.userNamePattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      userEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      imageUrl: ['']
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    const user = this.registerForm.value;
    this.authService.register(user).subscribe({
      next: (data: any) => {
        this.snackBar.open('Registration successful !!', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.isRegistered = true;  // Update the property on successful registration
        this.routerService.toLogin(); // Adjust the route as needed
      },
      error: (error: any) => {
        this.snackBar.open('Registration failed !! Please Try Again Later', 'close', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
        console.error(error);
      }
    });

    this.registerForm.reset();
  }

  canDeactivate(): boolean {
    if (this.registerForm.dirty && !this.isRegistered) {
      return confirm('You have unsaved changes! Are you sure you want to leave?');
    }
    return true;
  }
}
