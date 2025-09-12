import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { HardwareData } from '../model/HardwareData';
import { Router } from '@angular/router';

interface Device {
  name: string;
  version: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-device-details',
  standalone: true,
  imports: [CommonModule, CardModule, ScrollPanelModule, DashboardComponent, HeaderComponent],
  templateUrl: './device-details.component.html',
  styleUrl: './device-details.component.css'
})
export class DeviceDetailsComponent {
  selectedDevice: any;
  dashboardData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;

    if (state) {
      this.selectedDevice = state['selectedDevice'];
      this.dashboardData = state['newsData'];
    } else if (typeof window !== 'undefined' && window.history?.state) {
      this.selectedDevice = window.history.state.selectedDevice;
      this.dashboardData = window.history.state.newsData;
    } else {
      console.warn('No navigation state found.');
    }
  }
}
