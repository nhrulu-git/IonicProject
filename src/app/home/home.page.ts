import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonContent, IonCardTitle, IonCardContent, IonIcon, IonLabel, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [RouterLink, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonContent, IonCardTitle, IonCardContent, IonIcon, IonLabel, IonButton],
})
export class HomePage {
  constructor() {}
}
