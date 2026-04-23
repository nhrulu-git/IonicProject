import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonLabel, IonIcon, IonContent, IonButton, IonItem, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonSelect, IonSelectOption} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';

import { ComponentService, Cpu, Motherboard, Ram } from '../services/component';
@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonLabel, IonIcon, IonContent, IonButton, FormsModule, CommonModule, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSelect, IonSelectOption],
  templateUrl: './builder.page.html'
})
export class BuilderPage implements OnInit {

  cpus: Cpu[] = [];
  motherboards: Motherboard[] = [];
  ram: Ram[] = [];
  errors: string[] = [];
  score: number = 0;

  selectedCpu?: Cpu;
  selectedMotherboard?: Motherboard;
  selectedRam?: Ram;

  constructor(private componentService: ComponentService,
              private storage: Storage
  ) {}

  async ngOnInit() {

    await this.storage.create();

    this.componentService.getCpus().subscribe(data => {
      this.cpus = data;
    });

    this.componentService.getMotherboards().subscribe(data => {
      this.motherboards = data;
    });

    this.componentService.getRam().subscribe(data => {
      this.ram = data;
    });

    const savedBuild = await this.storage.get('currentBuild');

      if (savedBuild) {
        this.selectedCpu = savedBuild.cpu;
        this.selectedMotherboard = savedBuild.motherboard;
        this.selectedRam = savedBuild.ram;
        this.score = savedBuild.score;

        this.checkCompatibility();
      }
  }

  checkCompatibility() {
    this.errors = [];
    if (this.selectedCpu && this.selectedMotherboard) {
      if (this.selectedCpu.socket !== this.selectedMotherboard.socket) {
        this.errors.push('CPU and Motherboard sockets do not match.');
      }
    }
    if (this.selectedMotherboard && this.selectedRam) {
      if (this.selectedMotherboard.ramType !== this.selectedRam.type) {
        this.errors.push('Motherboard RAM type does not match selected RAM.');
      }
    }
  }

  onSelectionChange() {
    this.checkCompatibility();
    this.calculateScore();
  }

  calculateScore() {
    let totalChecks = 2;
    let passedChecks = totalChecks - this.errors.length;

    this.score = Math.max(0, (passedChecks / totalChecks) * 100);
  }

  async saveBuild() {
    const build = {
    cpu: this.selectedCpu,
    motherboard: this.selectedMotherboard,
    ram: this.selectedRam,
    score: this.score
  };

  let builds = await this.storage.get('builds');

  if (!builds) {
    builds = [];
  }

    builds.push(build);

    await this.storage.set('builds', builds);
  }
}