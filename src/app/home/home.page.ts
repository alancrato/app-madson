import { Component, OnInit } from '@angular/core';
import { WpServiceService } from '../services/wp-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [ WpServiceService ]
})
export class HomePage implements OnInit {

  items: any = [];
  page: number;
  loaded: boolean;
  loading: boolean;

  constructor(
      public wordpressService: WpServiceService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.page = 1;
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.wordpressService.getPosts(this.page)
        .subscribe(data => {
            this.items = data;
            this.loading = false;
            this.loaded = true;
        });
  }

  next() {
    this.page++;
    this.loadPosts();
  }

}
