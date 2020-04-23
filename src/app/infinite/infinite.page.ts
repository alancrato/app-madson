import {Component, OnInit} from '@angular/core';
import {WpServiceService} from '../services/wp-service.service';

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.page.html',
  styleUrls: ['./infinite.page.scss'],
  providers: [ WpServiceService ]
})
export class InfinitePage implements OnInit {

  page = 1;
  maximumPages = 100;
  items: any = [];
  pubs: { id: 1, title: '*Publicidade', img: 'https://www.sitemiseria.com.br/banners_topo/juaco_cabecalho_03_fev_2020_mob.jpg'};

  constructor(
      private wordpressService: WpServiceService
  ) {}

  ngOnInit() {
    this.wordpressService.getPosts(this.page)
        .subscribe(data => {
          this.items = data;
        });
  }

  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.wordpressService.getPosts(this.page)
          .subscribe(data => {
            this.items.push({
              title: '*Publicidade',
              img: 'https://www.sitemiseria.com.br/banners_topo/juaco_cabecalho_03_fev_2020_mob.jpg'
            });
            for (const item of data) {
              this.items.push(item);
            }
          });
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.items.length === this.maximumPages) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
