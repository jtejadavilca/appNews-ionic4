import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../pages/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() i: number;
  @Input() noticia: Article;

  constructor(private iab: InAppBrowser,
              private actionSheetController: ActionSheetController) { }

  ngOnInit() {}

  abrirNoticia() {

    const browser = this.iab.create( this.noticia.url, '_system');
  }

  async lanzarMenu() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
