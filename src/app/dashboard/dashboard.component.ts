import { Component, OnInit, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from '../header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { HardwareData } from '../model/HardwareData';
import { DashboardServiceService } from '../services/dashboard-service.service';


interface Product {
  id: number;
  date: string;
  name: string;
  category: string;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    HeaderComponent,
    InputTextModule,
    TooltipModule,
    PaginatorModule,
    HttpClientModule
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  data: HardwareData[] = [];
  constructor(private dashboardService: DashboardServiceService
  ) {}
  @ViewChild('table') table!: Table;
  loading: boolean = false;
  @Input() showHeader: boolean = true;
  @Input() dataFromParent: HardwareData[] = [];
  products: HardwareData[] = [];

  expandedRows: { [key: number]: boolean } = {};

  viewProduct(product: any) {
    console.log('Viewing product:', product);
    // Optionally show a dialog or navigate to details page
  }

  editProduct(product: any) {
    console.log('Editing product:', product);
    // Open a form dialog or route to edit page
  }

  deleteProduct(product: any) {
    console.log('Deleting product:', product);
    // Confirm deletion and remove from list
  }

  onRowToggle(event: any) {
    this.expandedRows = event.data;
  }

  toggleRow(productId: number): void {
    if (this.expandedRows[productId]) {
      delete this.expandedRows[productId];
    } else {
      this.expandedRows[productId] = true;
    }
  }

  onGlobalFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.table?.filterGlobal(input.value, 'contains');
  }

  getRowClass(product: any): string {
    if (product.quantity < 5) {
      return 'row-low-quantity';
    } else if (product.quantity >= 5 && product.quantity <= 10) {
      return 'row-medium-quantity';
    } else {
      return '';
    }
  }

  getFetchedAtRowClass(item: any): string {
    if (!item.fetchedAt) return '';

    const fetchedDate = new Date(item.fetchedAt);
    const now = new Date();

    const diffInMs = now.getTime() - fetchedDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays <= 30) {
      return 'row-fetched-recent';
    } else if (diffInDays <= 180) {
      return 'row-fetched-medium';
    } else {
      return 'row-fetched-old';
    }

    return '';
  }



  refreshTable() {
    console.log('Refresh clicked');
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      // Additional refresh logic here
    }, 100);

  }

  ngOnInit(): void {
    if (this.dataFromParent && this.dataFromParent.length > 0) {
      this.data = this.dataFromParent;
    } else {
      console.warn('No data received from parent.');
      this.data = [];
    }
  }

  openFirmwareLink(link: string): void {
    if (link) {
      window.open(link, '_blank');
    } else {
      console.warn('No link provided for this item.');
    }
  }


}
