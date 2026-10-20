import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonSpinner,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonBadge,
  IonFooter,
} from '@ionic/angular/standalone';
import { ApiService } from '../../services/api.service';
import { Product } from '../models/product.model';

interface GameItem {
  title: string;
  icon: string;
  badge: string;
  color: 'primary' | 'secondary';
}

interface SearchbarInputEvent extends CustomEvent {
  detail: {
    value?: string | null;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonSpinner,
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonBadge,
    IonFooter,
  ],
})
export class HomePage implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = true;
  errorMessage = '';

  // Datos provisionales que alimentan la lista estática de la plantilla.
  games: GameItem[] = [
    { title: 'Pokémon Yellow', icon: 'https://ionicframework.com/docs/img/demos/avatar.svg', badge: '22k', color: 'primary' },
    { title: 'Mega Man X', icon: 'https://ionicframework.com/docs/img/demos/avatar.svg', badge: '118k', color: 'secondary' },
    { title: 'The Legend of Zelda', icon: 'https://ionicframework.com/docs/img/demos/avatar.svg', badge: '22k', color: 'primary' },
    { title: 'Pac-Man', icon: 'https://ionicframework.com/docs/img/demos/avatar.svg', badge: '118k', color: 'secondary' },
    { title: 'Super Mario World', icon: 'https://ionicframework.com/docs/img/demos/avatar.svg', badge: '22k', color: 'primary' },
  ];

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        this.errorMessage = error instanceof Error
          ? error.message
          : 'Error al conectar con la API.';
        this.isLoading = false;
      },
    });
  }

  filterProducts(event: SearchbarInputEvent): void {
    const query = event.detail.value?.trim().toLocaleLowerCase() ?? '';

    this.filteredProducts = this.products.filter((product) =>
      product.title.toLocaleLowerCase().includes(query) ||
      product.category.toLocaleLowerCase().includes(query),
    );
  }
}
