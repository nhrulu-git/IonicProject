import { Component } from '@angular/core';
import { IonApp, IonIcon, IonRouterOutlet, IonHeader, IonToolbar, IonButtons, IonButton,} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonIcon,
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    RouterLink
  ],
})
export class AppComponent {}