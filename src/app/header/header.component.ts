import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SidebarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}
  sidebarVisible = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout(): void {
    // Clear any stored user data if needed
    localStorage.clear(); // Optional: if you’re storing login info
    this.router.navigate(['/login']);
  }

}
