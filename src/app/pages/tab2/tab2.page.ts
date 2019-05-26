import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  categorias = [ 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology' ];
  noticias: Article[] = [];
  categoria: string;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.categoria = this.categorias[0];
    this.segment.value = this.categoria;
    this.cargarNoticiasPorCategoria();
  }

  cambiarCategoria(event) {
    this.noticias = [];
    this.categoria = event.detail.value;
    this.cargarNoticiasPorCategoria();
  }
  cargarNoticiasPorCategoria(event?) {
    this.noticiasService.getTopHeadlinesCategoria(this.categoria)
    .subscribe( resp => {
      this.noticias.push(...resp.articles);
      console.log(resp);
      if (event || resp.articles.length === 0) {
        event.target.complete();
      }
    } );
  }

  loadData( event ) {
    console.log(event);
    this.cargarNoticiasPorCategoria(event);
  }
}
