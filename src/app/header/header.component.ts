import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SidebarModule, ButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  sidebarVisible = false;

  constructor(private router: Router, private location: Location) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  goBack() {
    this.location.back();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
