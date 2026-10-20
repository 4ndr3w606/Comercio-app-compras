import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
standalone: true
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