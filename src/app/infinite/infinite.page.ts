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
