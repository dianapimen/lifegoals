import { Component, OnInit } from '@angular/core';
import { MetaService } from '../services/meta-service.service';
import { Meta } from '../models/meta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  metas: Meta[] = [];
  nuevaMeta: string = '';

  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de la base de datos
    this.metaService.getMetas().subscribe(res => {
      this.metas = res;
    });
  }

  agregar() {
    if (this.nuevaMeta.trim().length > 0) {
      this.metaService.addMeta({ meta: this.nuevaMeta });
      this.nuevaMeta = ''; // Limpiar el campo
    }
  }

  eliminar(id: string) {
    this.metaService.deleteMeta(id);
  }
}
