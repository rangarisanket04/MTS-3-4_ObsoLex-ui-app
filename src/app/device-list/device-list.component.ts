import { Component } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../services/dashboard-service.service';

interface Device {
  name: string;
  version: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    HeaderComponent,
    DashboardComponent,
    ButtonModule,
    CardModule,
    CommonModule,
    DialogModule,
    ScrollPanelModule
  ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent {
  loading: boolean = false;
  devices: Device[] = [];
  selectedDevice?: Device;
  

  constructor(
    private router: Router,
    private dashboardService: DashboardServiceService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDeviceLifecycleData().subscribe({
      next: (response) => {
        this.devices = response.hardwareData.map(item => ({
          name: item.hardwareName,
          version: item.pciPts?.version || 'N/A',
          imageUrl: this.getDeviceImage(item.hardwareName),
          description: item.additionalNotes || 'No details available'
        }));
      },
      error: (err) => {
        console.error('Failed to fetch lifecycle data', err);
      }
    });
  }

  getDeviceImage(hardwareName: string): string {
    const imageMap: { [key: string]: string } = {
      'Axium EX6000': 'assets/images/DX8000-5.png',
      'Miura M020': 'assets/images/filters_no_upscale().webp',
      'Open 1500/2500 EMV reader': 'assets/images/Move_5000_1.png',
      'Link 2500 EMV reader': 'assets/images/Ingenico-Link2500 LE-face-1200px.png.webp'
    };

    return imageMap[hardwareName] || 'assets/images/default-device.png';
  }

  getMoreInfo(device: Device) {
    this.loading = true;
  
    const hardwareName = device.name; // map it
    const encodedName = encodeURIComponent(hardwareName);
    const limit = 20;
  
    console.log("Formatted Hardware Name:", hardwareName);
  
    // Step 1: POST to initiate scan
    this.dashboardService.scanDevice([device.name]).subscribe({
      next: (scanCount: number) => {  // scanCount is the int returned by POST
        console.log(`Scan API completed. ${scanCount} records updated.`);
    
        // Use the count as the limit in GET API
        this.dashboardService.getDashboardData(hardwareName, scanCount).subscribe({
          next: (newsData) => {
            console.log('News data received:', newsData);
            this.loading = false;
    
            this.router.navigate(['/device-details'], {
              state: {
                selectedDevice: device,
                newsData: newsData
              }
            });
          },
          error: (err) => {
            this.loading = false;
            console.error('Error fetching news data:', err);
          }
        });
      },
      error: (err) => {
        this.loading = false;
        console.error('Error calling scan API:', err);
      }
    });
    
  }
 
}
