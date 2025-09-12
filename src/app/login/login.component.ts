import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    
  ]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  submitted = false;

  login() {
    this.submitted = true;
    this.error = '';
  
    if (!this.username || !this.password) {
      this.error = 'Please enter username and password.';
      return;
    }
  
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/device-list']);
    } else {
      this.error = 'Invalid credentials';
    }
  }

}
