import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterService } from '../../core/services/router.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userId: string = '';
  userName: string = '';
  password: string = '';
  userEmail: string = '';
  imageUrl: string = '';

  constructor(private authService: AuthService, private routerService: RouterService,
    private snackBar: MatSnackBar,

  ) {}

  onRegister() {
    const user = {
      userId: this.userId,
      userName: this.userName,
      password: this.password,
      userEmail: this.userEmail,
      imageUrl: this.imageUrl,
      movieList: []
    };
    this.authService.register(user).subscribe({
      next: (data: any) => {
        this.snackBar.open('Registration successful !!', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        console.log(data);
        this.routerService.toDashboard(); // Adjust the route as needed
      },
      error: (error: any) => {
        this.snackBar.open('Registration failed !! Please Try Again Later', 'close', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
        console.error(error);
      }
    });


  }
}























 /*this.authService.register(user).subscribe(
      response => {
        alert('Registration successful');
        this.routerService.toDashboard();
      },
      error => {
        alert('Registration failed');
        console.error(error);
      }
    );*/
