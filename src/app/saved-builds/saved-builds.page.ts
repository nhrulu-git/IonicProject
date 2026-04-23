import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonButton, IonIcon, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent} from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-builds',
  templateUrl: './saved-builds.page.html',
  styleUrls: ['./saved-builds.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonButton, IonIcon, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, CommonModule, FormsModule]
})
export class SavedBuildsPage implements OnInit {
  builds: any[] = [];
  
  constructor(private storage: Storage, private router: Router) { }

  async ngOnInit() {
    await this.storage.create();
    this.builds = await this.storage.get('builds') || [];
  }

  async deleteBuild(index: number) {
    this.builds.splice(index, 1);
    await this.storage.set('builds', this.builds);
  }
  
  async loadBuild(build: any) {
    await this.storage.set('currentBuild', build);
    this.router.navigate(['/builder']);
  }
}
