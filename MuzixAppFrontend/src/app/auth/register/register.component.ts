import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterService } from '../../core/services/router.service';

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

  constructor(private authService: AuthService, private routerService: RouterService) {}

  onRegister() {
    const user = {
      userId: this.userId,
      userName: this.userName,
      password: this.password,
      userEmail: this.userEmail,
      imageUrl: this.imageUrl,
      movieList: []
    };

    this.authService.register(user).subscribe(
      response => {
        alert('Registration successful');
        this.routerService.toDashboard();
      },
      error => {
        alert('Registration failed');
        console.error(error);
      }
    );
  }
}
