import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../pages/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() i: number;
  @Input() noticia: Article;

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {}

  abrirNoticia() {

    const browser = this.iab.create( this.noticia.url, '_system');
  }
}
