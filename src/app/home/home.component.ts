import { Component, OnInit } from '@angular/core';
import { MetaService } from '../services/meta-service.service';
import { Meta } from '../models/meta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  metas: Meta[] = [];
  nuevaMeta: string = '';

  constructor(private metaService: MetaService) {}

  ngOnInit() {
    this.metaService.getMetas().subscribe(res => this.metas = res);
  }

  agregar() {
    if (this.nuevaMeta) {
      this.metaService.addMeta({ meta: this.nuevaMeta });
      this.nuevaMeta = '';
    }
  }

  eliminar(id: string) {
    this.metaService.deleteMeta(id);
  }
}
