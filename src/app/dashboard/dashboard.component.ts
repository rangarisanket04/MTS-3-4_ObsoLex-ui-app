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
  // products: Product[] = [
  //   {
  //     id: 1,
  //     date: '2025-01-01',
  //     name: 'Apple',
  //     category: 'Fruits',
  //     quantity: 10,
  //     description: 'An apple is a round or oval-shaped fruit that grows on apple trees (Malus domestica). It is one of the most widely cultivated fruits in the world and is known for its crisp texture and sweet to slightly tart flavor. Apples typically have a smooth, thin skin that can range in color from red, green, yellow, or a mix of these. Inside, the flesh is juicy and white to pale yellow, surrounding a core that contains small, brown seeds. There are many varieties of apples, each with its own taste, color, and use. Some are best for eating raw (like Fuji or Gala), while others are ideal for cooking or baking (like Granny Smith or Braeburn). Apples are not only delicious but also nutritious, being a good source of dietary fiber, vitamin C, and various antioxidants. They are often associated with health, as seen in the old saying: “An apple a day keeps the doctor away.”',
  //   },
  //   {
  //     id: 2,
  //     date: '2025-02-01',
  //     name: 'Carrot',
  //     category: 'Vegetables',
  //     quantity: 4,
  //     description: 'A carrot is a root vegetable that is commonly orange in color, though it can also be found in purple, red, yellow, and white varieties. It grows underground, with a leafy green top that extends above the soil. Carrots are long, slender, and taper to a point, with a crisp texture when raw and a slightly sweet flavor that becomes richer when cooked. The orange color comes from beta-carotene, which the body converts into vitamin A, essential for good vision, skin, and immune health. Carrots can be eaten raw, cooked, steamed, roasted, or used in soups, salads, and juices. They are popular around the world and are valued for both their nutritional benefits and their versatility in cooking. Carrots are especially well known as a healthy snack and are often associated with good eye health — though the idea that they help you see in the dark is mostly a myth!',
  //   },
  //   {
  //     id: 3,
  //     date: '2025-03-01',
  //     name: 'Banana',
  //     category: 'Fruits',
  //     quantity: 15,
  //     description: 'A banana is a long, curved fruit with a smooth yellow peel and soft, creamy white flesh inside. It grows in clusters on large, tropical plants (often mistaken for trees) and is one of the most popular fruits in the world. Bananas have a naturally sweet flavor and are usually eaten raw, but they can also be used in smoothies, desserts, baked goods (like banana bread), and even savory dishes in some cultures. Rich in potassium, vitamin B6, and fiber, bananas are a great source of quick energy and are often eaten by athletes and health-conscious people. The peel is not eaten, though in some cuisines, it is used in cooking once properly prepared. The fruit ripens after being picked, turning from green to yellow, and eventually developing brown spots when fully ripe. Overripe bananas are extra sweet and perfect for baking.'
  //   },
  //   {
  //     id: 4,
  //     date: '2025-01-01',
  //     name: 'Apple',
  //     category: 'Fruits',
  //     quantity: 10,
  //     description: 'An apple is a round or oval-shaped fruit that grows on apple trees (Malus domestica). It is one of the most widely cultivated fruits in the world and is known for its crisp texture and sweet to slightly tart flavor. Apples typically have a smooth, thin skin that can range in color from red, green, yellow, or a mix of these. Inside, the flesh is juicy and white to pale yellow, surrounding a core that contains small, brown seeds. There are many varieties of apples, each with its own taste, color, and use. Some are best for eating raw (like Fuji or Gala), while others are ideal for cooking or baking (like Granny Smith or Braeburn). Apples are not only delicious but also nutritious, being a good source of dietary fiber, vitamin C, and various antioxidants. They are often associated with health, as seen in the old saying: “An apple a day keeps the doctor away.”',
  //   },
  //   {
  //     id: 5,
  //     date: '2025-02-01',
  //     name: 'Carrot',
  //     category: 'Vegetables',
  //     quantity: 20,
  //     description: 'A carrot is a root vegetable that is commonly orange in color, though it can also be found in purple, red, yellow, and white varieties. It grows underground, with a leafy green top that extends above the soil. Carrots are long, slender, and taper to a point, with a crisp texture when raw and a slightly sweet flavor that becomes richer when cooked. The orange color comes from beta-carotene, which the body converts into vitamin A, essential for good vision, skin, and immune health. Carrots can be eaten raw, cooked, steamed, roasted, or used in soups, salads, and juices. They are popular around the world and are valued for both their nutritional benefits and their versatility in cooking. Carrots are especially well known as a healthy snack and are often associated with good eye health — though the idea that they help you see in the dark is mostly a myth!',
  //   },
  //   {
  //     id: 6,
  //     date: '2025-03-01',
  //     name: 'Banana',
  //     category: 'Fruits',
  //     quantity: 15,
  //     description: 'A banana is a long, curved fruit with a smooth yellow peel and soft, creamy white flesh inside. It grows in clusters on large, tropical plants (often mistaken for trees) and is one of the most popular fruits in the world. Bananas have a naturally sweet flavor and are usually eaten raw, but they can also be used in smoothies, desserts, baked goods (like banana bread), and even savory dishes in some cultures. Rich in potassium, vitamin B6, and fiber, bananas are a great source of quick energy and are often eaten by athletes and health-conscious people. The peel is not eaten, though in some cuisines, it is used in cooking once properly prepared. The fruit ripens after being picked, turning from green to yellow, and eventually developing brown spots when fully ripe. Overripe bananas are extra sweet and perfect for baking.'
  //   },
  //   {
  //     id: 7,
  //     date: '2025-01-01',
  //     name: 'Apple',
  //     category: 'Fruits',
  //     quantity: 10,
  //     description: 'An apple is a round or oval-shaped fruit that grows on apple trees (Malus domestica). It is one of the most widely cultivated fruits in the world and is known for its crisp texture and sweet to slightly tart flavor. Apples typically have a smooth, thin skin that can range in color from red, green, yellow, or a mix of these. Inside, the flesh is juicy and white to pale yellow, surrounding a core that contains small, brown seeds. There are many varieties of apples, each with its own taste, color, and use. Some are best for eating raw (like Fuji or Gala), while others are ideal for cooking or baking (like Granny Smith or Braeburn). Apples are not only delicious but also nutritious, being a good source of dietary fiber, vitamin C, and various antioxidants. They are often associated with health, as seen in the old saying: “An apple a day keeps the doctor away.”',
  //   },
  //   {
  //     id: 8,
  //     date: '2025-02-01',
  //     name: 'Carrot',
  //     category: 'Vegetables',
  //     quantity: 20,
  //     description: 'A carrot is a root vegetable that is commonly orange in color, though it can also be found in purple, red, yellow, and white varieties. It grows underground, with a leafy green top that extends above the soil. Carrots are long, slender, and taper to a point, with a crisp texture when raw and a slightly sweet flavor that becomes richer when cooked. The orange color comes from beta-carotene, which the body converts into vitamin A, essential for good vision, skin, and immune health. Carrots can be eaten raw, cooked, steamed, roasted, or used in soups, salads, and juices. They are popular around the world and are valued for both their nutritional benefits and their versatility in cooking. Carrots are especially well known as a healthy snack and are often associated with good eye health — though the idea that they help you see in the dark is mostly a myth!',
  //   },
  //   {
  //     id: 9,
  //     date: '2025-03-01',
  //     name: 'Banana',
  //     category: 'Fruits',
  //     quantity: 15,
  //     description: 'A banana is a long, curved fruit with a smooth yellow peel and soft, creamy white flesh inside. It grows in clusters on large, tropical plants (often mistaken for trees) and is one of the most popular fruits in the world. Bananas have a naturally sweet flavor and are usually eaten raw, but they can also be used in smoothies, desserts, baked goods (like banana bread), and even savory dishes in some cultures. Rich in potassium, vitamin B6, and fiber, bananas are a great source of quick energy and are often eaten by athletes and health-conscious people. The peel is not eaten, though in some cuisines, it is used in cooking once properly prepared. The fruit ripens after being picked, turning from green to yellow, and eventually developing brown spots when fully ripe. Overripe bananas are extra sweet and perfect for baking.'
  //   },
  //   {
  //     id: 10,
  //     date: '2025-03-01',
  //     name: 'Banana',
  //     category: 'Fruits',
  //     quantity: 15,
  //     description: 'A banana is a long, curved fruit with a smooth yellow peel and soft, creamy white flesh inside. It grows in clusters on large, tropical plants (often mistaken for trees) and is one of the most popular fruits in the world. Bananas have a naturally sweet flavor and are usually eaten raw, but they can also be used in smoothies, desserts, baked goods (like banana bread), and even savory dishes in some cultures. Rich in potassium, vitamin B6, and fiber, bananas are a great source of quick energy and are often eaten by athletes and health-conscious people. The peel is not eaten, though in some cuisines, it is used in cooking once properly prepared. The fruit ripens after being picked, turning from green to yellow, and eventually developing brown spots when fully ripe. Overripe bananas are extra sweet and perfect for baking.'
  //   }
  // ];


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
      return 'row-fetched-recent'; // green
    } else if (diffInDays <= 180) {
      return 'row-fetched-medium'; // orange
    } else {
      return 'row-fetched-old'; // red
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
