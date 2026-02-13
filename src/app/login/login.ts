import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  username: string = '';
  password: string = '';
  isLoggedin = false;
  error: string = '';
  data: any = {};

  constructor(private router: Router, private authService: Auth) { }

  doLogin() {
  if (this.username !== '' && this.password !== '') {
    this.authService.authenticate(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error("Login failed: ", error);
        this.error = 'Invalid credentials or error during login';
      }
    });
  } 
  else {
    window.alert("Please enter both username and password.");
  }
}
}
