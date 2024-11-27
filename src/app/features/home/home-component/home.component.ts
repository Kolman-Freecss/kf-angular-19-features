import { Component, ChangeDetectionStrategy, ChangeDetectorRef, signal } from '@angular/core';

interface User {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush // When using OnPush strategy, you need to manually trigger change detection
})
export class HomeComponent {
  user = signal<User>({ firstName: 'Alice', lastName: 'Smith' });
  data = signal<string | null>(null);
  error = signal<string | null>(null);

  constructor(private cdr: ChangeDetectorRef) {
    this.loadData();
  }

  changeUserName() {
    this.user.set({ firstName: 'Bob', lastName: this.user().lastName });
    this.cdr.markForCheck(); // For OnPush strategy
  }

  loadData() {
    setTimeout(() => {
      try {
        this.data.set('Datos cargados correctamente');
      } catch (err) {
        this.error.set('Error al cargar los datos');
      }
      this.cdr.markForCheck(); // For OnPush strategy
    }, 2000);
  }
}
