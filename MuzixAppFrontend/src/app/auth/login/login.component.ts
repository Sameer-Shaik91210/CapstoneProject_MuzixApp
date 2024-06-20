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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.logInForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    let logInUser: any = this.logInForm.value as any;
    console.log(logInUser);

    this.authService.login(logInUser).subscribe({
      next: (data: any) => {
        this.snackBar.open('Login successful !!', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        console.log(data);

        // Save the token
        console.log(data,"from login component");
        this.authService.saveToken(data);

        // Navigate to the dashboard
        this.router.navigate(['/dashboard']); // Adjust the route as needed
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
