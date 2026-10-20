import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IonButton,IonBadge,  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,IonItem, IonLabel, IonList, IonCardTitle, IonFooter, IonHeader, IonTitle, IonContent, IonToolbar } from '@ionic/angular';
import { IonAvatar } from '@ionic/angular';

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
standalone: true,
 imports: [IonButton, IonAvatar, IonBadge, IonItem, IonLabel, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonFooter, IonHeader, IonTitle, IonContent, IonToolbar],
})
export class HomePage implements OnInit {
private apiService = inject(ApiService);
items: any[] = [];
ngOnInit() {
this.apiService.getItems().subscribe({
next: (data) => this.items = data,
error: (err) => console.error('Error:', err)
});
}
}