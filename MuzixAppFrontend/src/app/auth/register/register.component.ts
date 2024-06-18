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
    // Create a user object with the form data
    const user = {
      userId: this.userId,
      userName: this.userName,
      password: this.password,
      userEmail: this.userEmail,
      imageUrl: this.imageUrl,
      movieList: [] // Initialize movieList as an empty array
    };

    // Call the AuthService to register the user

    if (!this.authService.register(user)) {
      alert('Registration failed');
    }else{
      console.log("Check 1 in login");
      this.routerService.toDashboard();
    }
  }
}
