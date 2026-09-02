import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-home.component',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(){}

  private router = inject(Router);
  menucards: any[] = [];

  ngOnInit(){
    this.generateCards();
    console.log("cards data: ", this.menucards)
  }

  generateCards() {
    // Accedemos a las rutas globales
    this.menucards = this.router.config.filter(route => route.path && !route.path.includes('**')) // Con esto filtramos rutas
                                              .map(route => ({
                                                title: this.formatTitle(route.path!), // Esto crea un título legible
                                                path: `/${route.path}`,
                                                data: route.data
                                              }));
  }
  
  private formatTitle(path: string): string {
    // Convierte "mi-ruta-ejemplo" a "Mi Ruta Ejemplo"
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
